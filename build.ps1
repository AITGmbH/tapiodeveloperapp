$BUILD_PACKAGES = '.buildpackages'
$FAKE_VERSION = "5.12.0"
$FAKE_PACKAGE_NAME = "fake-cli"

# prerequisites dotnet sdk is installed

# the folder is needed to successfully list the tools
if (!(Test-Path $BUILD_PACKAGES)) {
  New-Item -Path $BUILD_PACKAGES -ItemType Directory | Out-Null
}

$installedPackages = & dotnet tool list --tool-path "$BUILD_PACKAGES" | Out-String
$fakeEntry = $installedPackages -split "`n" | Select-String -Pattern "$FAKE_PACKAGE_NAME" -CaseSensitive | Select-Object -First 1


if ($null -eq $fakeEntry) {
  # installs fake cli if not present
  & dotnet tool install "$FAKE_PACKAGE_NAME" `
    --tool-path "$BUILD_PACKAGES" `
    --version "$($FAKE_VERSION)"

  if ($LASTEXITCODE -ne 0) {
    throw "Could not install $FAKE_PACKAGE_NAME"
  }
}
elseif(-not ($fakeEntry -like "*$($FAKE_VERSION)*")) {
  # update fake cli if the given version is not present, first uninstall it.
  # Uninstallation is needed, because the update command will always install the latest version
  & dotnet tool uninstall "$FAKE_PACKAGE_NAME" `
    --tool-path "$BUILD_PACKAGES"

  & dotnet tool install "$FAKE_PACKAGE_NAME" `
    --tool-path "$BUILD_PACKAGES" `
    --version "$($FAKE_VERSION)"

  if ($LASTEXITCODE -ne 0) {
    throw "Could not update $FAKE_PACKAGE_NAME"
  }
}
else {
  Write-Host "The cli tool '$FAKE_PACKAGE_NAME' in version $FAKE_VERSION is already installed"
}


$fakePath = Join-Path $BUILD_PACKAGES 'fake.exe'

& "$fakePath" run build.fsx
