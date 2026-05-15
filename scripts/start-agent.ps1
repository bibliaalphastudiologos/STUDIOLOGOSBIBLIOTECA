$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $root

Write-Host "Iniciando Agente Web 24h em http://127.0.0.1:5173"
node server.js
