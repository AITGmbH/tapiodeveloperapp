# Tapio DeveloperApp

> A show case for [tapio](https://tapio.one/)

[![Build Status](https://dev.azure.com/ait-public/tapioDeveloperApp/_apis/build/status/AITGmbH.tapiodeveloperapp.CI?branchName=master)](https://dev.azure.com/ait-public/tapioDeveloperApp/_build/latest?definitionId=2&branchName=master)

[![Preview Deplyoment Status](https://vsrm.dev.azure.com/ait-public/_apis/public/Release/badge/654de716-0886-436a-8a4b-068a6af8aad0/1/1)](https://dev.azure.com/ait-public/tapioDeveloperApp/_release?definitionId=1)

## Developement

Run the `Ensure-Prerequisites.ps1` PowerShell script to install the prerequisites.

## Build

Execute the following commands

```bash
cd src\web
ng build
npm install
dotnet build
```

The result can be found in the directory `src\web\bin\Debug\netcoreapp2.2`

## Start

### Locally

Execute the following commands in one shell

```bash
cd src\web
ng build --watch
```

Execute the following commands in another shell

```bash
cd src\web
dotnet run
```

Navigate to <https://localhost:5001> with a browser

### Publish

Execute the following commands

```bash
cd src\web
npm install
ng build
dotnet publish
```

The result can be found in the directory `src\web\bin\Debug\netcoreapp2.2\publish`

## License

Lincensed under [MIT License](LICENSE)
