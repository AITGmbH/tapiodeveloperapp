#r "paket: groupref Build //"
#load "./.fake/build.fsx/intellisense.fsx"

open Fake.BuildServer
open Fake.Core
open Fake.Core.TargetOperators
open Fake.DotNet
open Fake.JavaScript

BuildServer.install [
    TeamFoundation.Installer
]

Target.create "Install.Prerequisites" (fun _ ->
    if not BuildServer.isLocalBuild then
        let npmPath = ProcessUtils.tryFindFileOnPath "npm"
        if npmPath.IsNone then failwith "npm could not be found"

        let npmInstallAngularCli =
            ["install"; "-g"; "@angular/cli"]
            |> CreateProcess.fromRawCommand npmPath.Value
            |> CreateProcess.withWorkingDirectory "./src/web"
            |> Proc.run
        if npmInstallAngularCli.ExitCode <> 0 then failwith "could not install angular cli via npm"
)

Target.create "Build.Frontend" (fun _ ->
    Npm.install (fun o ->
        { o with
            WorkingDirectory = "./src/web"
        })

    let angular = ProcessUtils.tryFindFileOnPath  "ng"
    if angular.IsNone then failwith "angular cli could not be found"

    let angularResult =
        ["build"; "--prod"]
        |> CreateProcess.fromRawCommand angular.Value
        |> CreateProcess.withWorkingDirectory "./src/web"
        |> Proc.run
    if angularResult.ExitCode <> 0 then failwith "could not build frontend"
)

Target.create "Build.Backend" (fun _ ->

    let buildParams (o: DotNet.BuildOptions) =
        { o with
            Configuration = DotNet.BuildConfiguration.Release
        }

    DotNet.build buildParams "./src/web/web.csproj"
)

Target.create "Publish" (fun _ ->
    let publishParams (o: DotNet.PublishOptions) =
        if BuildServer.isLocalBuild then
            { o with
                Configuration = DotNet.BuildConfiguration.Release
            }
        else
            { o with
                Configuration = DotNet.BuildConfiguration.Release
                OutputPath = Some(Environment.environVarOrFail("BUILD_ARTIFACTSTAGINGDIRECTORY") +  "/server")
            }
    DotNet.publish publishParams "./src/web/web.csproj"
)

let isEmptyDirectory x = (System.IO.Directory.GetFiles x).Length = 0 && (System.IO.Directory.GetDirectories x).Length = 0

let publishArtifacts path artifactName =
    if not (isEmptyDirectory path) then
        Trace.publish (ImportData.BuildArtifactWithName artifactName) path

Target.create "DeployArtifacts" (fun _ ->
    Trace.log "Uploading server artifacts"
    if not BuildServer.isLocalBuild then
        publishArtifacts (Environment.environVarOrFail("BUILD_ARTIFACTSTAGINGDIRECTORY") +  "/server") "server"
    else
        Trace.log "Skipping uploading server artifacts, because the build is not executed on the build server"
    ()
)

Target.create "Test.Frontend" (fun _ ->
    let npmPath = ProcessUtils.tryFindFileOnPath "npm"
    if npmPath.IsNone then failwith "npm could not be found"

    let npmTestCodeCoverage =
        ["test-codecoverage"; "--watch=false"]
        |> CreateProcess.fromRawCommand npmPath.Value
        |> CreateProcess.withWorkingDirectory "./src/web"
        |> Proc.run
    if npmTestCodeCoverage.ExitCode <> 0 then failwith "There was at least one failing test, or the tests couldn't be executed at all"
)

Target.create "All" ignore

"Install.Prerequisites"
    ==> "Build.Frontend"
    ==> "Test.Frontend"
    ==> "Build.Backend"
    ==> "Publish"
    ==> "DeployArtifacts"
    ==> "All"

Target.runOrDefault "All"
