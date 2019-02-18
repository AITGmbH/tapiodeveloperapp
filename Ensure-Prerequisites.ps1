<#
.SYNOPSIS
    Installs the prerequisites for the tapio developer app.
.DESCRIPTION
    Installs
      - dotnet cli
      - node.js (includes npm)
      - angular cli
#>
[CmdletBinding(SupportsShouldProcess=$true)]
param()

function Test-ProgramAvailable([string] $processName, [string] $arguments) {
    Start-Process $processName -ArgumentList $arguments -Wait -ErrorVariable isNotInstalled -ErrorAction SilentlyContinue -WindowStyle Hidden
    if ($isNotInstalled) {
        return $false;
    }

    return $true;
}

function Install-AngularCli() {
    [CmdletBinding(SupportsShouldProcess=$true)]
    param()
    if ($PSCmdlet.ShouldProcess('Target')) {
        if (-not $PSCmdlet.ShouldContinue('The angular CLI is not installed. Install angular CLI ', 'angular CLI  needed')) {
            Write-Host 'Please install angular CLI manually (npm install -g @angular/cli)'
        }
        else {
            Write-Host 'Installing angular CLI'
            Start-Process npm -ArgumentList 'install','-g','@angular/cli' -NoNewWindow -Wait
        }
    }
}

function Install-DotnetCore() {
    [CmdletBinding(SupportsShouldProcess=$true)]
    param()
    if ($PSCmdlet.ShouldProcess('Target')) {
        if (-not $PSCmdlet.ShouldContinue('The .NET core sdk is not installed. Install .NET core SDK?', '.NET core SDK needed')) {
            Write-Host "Please installed the .NET core SDK (version $dotnetVersion) manually (https://dotnet.microsoft.com/download)"
        }
        else {

            Write-Host "Installing .NET core SDK in version $dotnetVersion"

            Write-Host 'Unblocking official .NET core SDK installation script'
            Unblock-File -Path .\scripts\dotnet-install.ps1 -ErrorAction Stop

            Write-Host 'Executing official .NET core SDK installation script'
            . .\scripts\dotnet-install.ps1 -Architecture 'x64' -Version $dotnetVersion -ErrorAction Stop
        }
    }
}

$dotnetVersion = '2.2.103'
$needsDotnetToBeInstalled = $false
if (-not (Test-ProgramAvailable 'dotnet' '--version')) {
    $needsDotnetToBeInstalled = $true
}
else {
    Write-Host 'At least one .NET core SDK is already installed'
    [string[]]$outputFromDotnet = dotnet --list-sdks

    [string]$escapedVersion = $dotnetVersion.Replace(".", "\.")
    [bool]$containsExactVersion = $false
    foreach ($item in $outputFromDotnet) {
        # the space at the end of the string literal is on purpose to match the overall version
        if ($item -match "^$escapedVersion ") {
            $containsExactVersion = $true
            break
        }
    }

    if (!$containsExactVersion) {
        $needsDotnetToBeInstalled = $true
    }
}

if ($needsDotnetToBeInstalled) {
    Install-DotnetCore
}

if (-not (Test-ProgramAvailable 'npm' '--version')) {
    $nodeVersion = '11.9.0'
    if ($PSCmdlet.ShouldProcess('Target')) {
        if (-not $PSCmdlet.ShouldContinue('NPM is not installed. Install NPM', 'NPM needed')) {
            Write-Host "Please installed NPM (version $dotnetVersion) manually (https://nodejs.org/en/download/current/)"
        }
        else {
            $tempNodeMsiPath = Join-Path $env:TEMP ([System.IO.Path]::GetRandomFileName())
            $tempLogPath = Join-Path $env:TEMP ([System.IO.Path]::GetRandomFileName())
            try {
                Invoke-WebRequest -Uri "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi" -OutFile $tempNodeMsiPath
                $msi = Start-Process msiexec -ArgumentList '/qn','/l*', $tempLogPath, '/i', $tempNodeMsiPath -Wait -PassThru
                if ($msi -eq 0) {
                    Install-AngularCli
                }
                else {
                    Write-Host "Could not install node.js, please inspect the log file $tempLogPath"
                }
            }
            finally {
                Remove-Item $tempNodeMsiPath
            }
        }
    }
}
else {
    Write-Host 'node.js is already installed'
    $packageName = '@angular/cli'
    [string[]]$outputFromNpm = npm list -g --depth=0
    [bool]$containsAngular = $false
    foreach ($item in $outputFromNpm) {
        if ($item.Contains($packageName)) {
            $containsAngular = $true
            break
        }
    }

    if (!$containsAngular) {
        Install-AngularCli
    }
    else {
        Write-Host 'angular CLI is already installed'
    }
}
