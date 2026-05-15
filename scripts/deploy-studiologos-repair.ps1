param(
    [string]$FtpHost = $env:HOSTINGER_FTP_HOST,
    [string]$FtpUser = $env:HOSTINGER_FTP_USER,
    [string]$RemoteDir = $(if ($env:HOSTINGER_REMOTE_DIR) { $env:HOSTINGER_REMOTE_DIR } else { "public_html" })
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$repairDir = Join-Path $root "repairs\studiologos"
$indexPath = Join-Path $repairDir "index.html"
$htaccessPath = Join-Path $repairDir ".htaccess"

if (-not (Test-Path -LiteralPath $indexPath)) {
    throw "Arquivo de reparo nao encontrado: $indexPath"
}

if (-not (Test-Path -LiteralPath $htaccessPath)) {
    throw "Arquivo .htaccess nao encontrado: $htaccessPath"
}

if (-not $FtpHost) {
    $FtpHost = Read-Host "Host FTP da Hostinger"
}

if (-not $FtpUser) {
    $FtpUser = Read-Host "Usuario FTP da Hostinger"
}

$securePassword = Read-Host "Senha FTP da Hostinger" -AsSecureString
$password = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
)

function Send-FtpFile {
    param(
        [string]$LocalPath,
        [string]$RemoteName
    )

    $remoteUri = "ftp://$FtpHost/$RemoteDir/$RemoteName"
    Write-Host "Enviando $RemoteName para $remoteUri"

    $request = [System.Net.FtpWebRequest]::Create($remoteUri)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $request.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $password)
    $request.UseBinary = $true
    $request.UsePassive = $true
    $request.KeepAlive = $false

    $bytes = [System.IO.File]::ReadAllBytes($LocalPath)
    $request.ContentLength = $bytes.Length

    $stream = $request.GetRequestStream()
    try {
        $stream.Write($bytes, 0, $bytes.Length)
    } finally {
        $stream.Close()
    }

    $response = $request.GetResponse()
    try {
        Write-Host "OK: $($response.StatusDescription.Trim())"
    } finally {
        $response.Close()
    }
}

Send-FtpFile -LocalPath $indexPath -RemoteName "index.html"
Send-FtpFile -LocalPath $htaccessPath -RemoteName ".htaccess"

Write-Host ""
Write-Host "Reparo enviado. Agora limpe o cache da Hostinger/LiteSpeed e abra:"
Write-Host "https://studiologos.com.br/?v=20260506-repair1"
