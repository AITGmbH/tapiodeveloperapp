# Tapio DeveloperApp

> A show case for [tapio](https://tapio.one/)

## Build

Execute the following commands

```bash
cd src\web
ng build
dotnet build
```

The result can be found in the directory `src\web\bin\Debug\netcoreapp2.2`

## Start

### Locally

Execute the following commands in one shell

```bash
cd src\web
npm install
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
ng build
dotnet publish
```

The result can be found in the directory `src\web\bin\Debug\netcoreapp2.2\publish`

## License

Lincensed under [MIT](LICENSE)
