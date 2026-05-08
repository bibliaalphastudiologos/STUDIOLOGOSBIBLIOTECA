param(
  [string]$ProjectId = "sentinela-ai-489015"
)

$ErrorActionPreference = "Stop"

Write-Host "Verificando conta Firebase atual..." -ForegroundColor Cyan
firebase login:list

Write-Host "Aplicando regras do Firestore para o Studio Logos..." -ForegroundColor Cyan
firebase deploy --only firestore:rules --project $ProjectId

Write-Host "Concluido. Colecoes esperadas:" -ForegroundColor Green
Write-Host "- studio_users"
Write-Host "- studio_payment_access"
Write-Host "- studio_payments"
