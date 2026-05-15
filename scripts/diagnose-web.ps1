param(
    [string]$Path = "."
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path -LiteralPath $Path
Write-Host "Diagnostico web em: $root"

$packageJson = Join-Path $root "package.json"
if (-not (Test-Path -LiteralPath $packageJson)) {
    Write-Host "package.json nao encontrado. Este script e voltado para projetos web Node."
    exit 0
}

$pkg = Get-Content -LiteralPath $packageJson -Raw | ConvertFrom-Json

Write-Host ""
Write-Host "Projeto:"
Write-Host "  Nome: $($pkg.name)"
Write-Host "  Versao: $($pkg.version)"

Write-Host ""
Write-Host "Scripts disponiveis:"
if ($pkg.scripts) {
    $pkg.scripts.PSObject.Properties | Sort-Object Name | ForEach-Object {
        Write-Host "  $($_.Name): $($_.Value)"
    }
} else {
    Write-Host "  Nenhum script encontrado."
}

Write-Host ""
Write-Host "Arquivos de configuracao comuns:"
$patterns = @(
    "next.config.*",
    "vite.config.*",
    "astro.config.*",
    "nuxt.config.*",
    "svelte.config.*",
    "tsconfig.json",
    "vercel.json",
    "netlify.toml",
    "render.yaml",
    "Dockerfile",
    ".env.example"
)

foreach ($pattern in $patterns) {
    Get-ChildItem -LiteralPath $root -Filter $pattern -Force -ErrorAction SilentlyContinue | ForEach-Object {
        Write-Host "  $($_.Name)"
    }
}

Write-Host ""
Write-Host "Comandos sugeridos:"
foreach ($script in @("lint", "test", "typecheck", "build")) {
    if ($pkg.scripts.$script) {
        Write-Host "  npm run $script"
    }
}
