# tapio DeveloperApp

> A show case for [tapio](https://tapio.one/)

[![Build Status](https://dev.azure.com/ait-public/tapioDeveloperApp/_apis/build/status/AITGmbH.tapiodeveloperapp.CI?branchName=master)](https://dev.azure.com/ait-public/tapioDeveloperApp/_build/latest?definitionId=2&branchName=master)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=AITGmbH_tapiodeveloperapp&metric=alert_status)](https://sonarcloud.io/dashboard?id=AITGmbH_tapiodeveloperapp)
[![Preview Deplyoment Status](https://vsrm.dev.azure.com/ait-public/_apis/public/Release/badge/654de716-0886-436a-8a4b-068a6af8aad0/1/1)](https://dev.azure.com/ait-public/tapioDeveloperApp/_release?definitionId=1)
[![License](https://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE)

[Production Website](https://tapiodeveloperapp.aitgmbh.de)

## Developement

Run the `Ensure-Prerequisites.ps1` PowerShell script to install the prerequisites.

## Build

Execute the following commands

```PowerShell
cd .\src\web
npm ci
ng build
dotnet build
```

The result can be found in the directory `src\web\bin\Debug\netcoreapp2.2`

## Start

### Locally

#### Setup environment

In order to authenticate against tapio the credentials have to be provided. First restore the dependencies.

```PowerShell
cd .\src\
dotnet restore
```

Now the [Microsoft.Extensions.SecretManager.Tools](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-2.2&tabs=windows) is available.

Run the following commands with the actual secrets

```PowerShell
cd .\src\web\
dotnet user-secrets set "TapioCloud:ClientID" "XYZ"
dotnet user-secrets set "TapioCloud:ClientSecret" "XYZ"
dotnet user-secrets set "TapioCloud:Email" "XYZ"
```

If you want to use streaming data you need to configure your [azure event hub](https://azure.microsoft.com/de-de/services/event-hubs/) instance and provide the according connection strings. A service for local live data generation will be added later on

```PowerShell
cd .\src\web\
dotnet user-secrets set "EventHub:EventHubEntityPath" "XYZ"
dotnet user-secrets set "EventHub:EventHubConnectionString" "XYZ"
dotnet user-secrets set "EventHub:StorageContainerName" "XYZ"
dotnet user-secrets set "EventHub:StorageConnectionString" "XYZ"
```

#### Run

Execute the following commands in one shell

```PowerShell
cd .\src\web
ng build --watch
```

Execute the following commands in another shell

```PowerShell
cd .\src\web
dotnet run
```

Navigate to <https://localhost:5001> with a browser

### Publish

Execute the following commands

```PowerShell
cd .\src\web
npm ci
ng build
dotnet publish
```

The result can be found in the directory `.\src\web\bin\Debug\netcoreapp2.2\publish`

### Azure App Service

Provide access to the client id and secret via [App Settings](https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#app-settings).
Settings

- TapioCloud:ClientID XYZ
- TapioCloud:ClientSecret XYZ
- TapioCloud:Email XYZ
- EventHub:EventHubEntityPath XYZ
- EventHub:EventHubConnectionString XYZ
- EventHub:StorageContainerName XYZ
- EventHub:StorageConnectionString XYZ

## Execute Tests

### Front End

```PowerShell
cd .\src\web
ng test
```

### Back End

```PowerShell
cd .\src
dotnet test
```

## Legal Notice

You can find the Legal Notice - [Impressum](https://www.aitgmbh.de/impressum/).

## License

Licensed under [MIT License](LICENSE)
