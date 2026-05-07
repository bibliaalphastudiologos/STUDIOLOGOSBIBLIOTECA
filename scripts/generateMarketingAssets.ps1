Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$outRoot = Join-Path $root "divulgacao-instagram"
$storyDir = Join-Path $outRoot "STORY"
$feedDir = Join-Path $outRoot "FEED"
$reelDir = Join-Path $outRoot "REEL"

New-Item -ItemType Directory -Force -Path $storyDir, $feedDir, $reelDir | Out-Null

function New-Color($hex) {
  $clean = $hex.TrimStart("#")
  return [System.Drawing.Color]::FromArgb(
    [Convert]::ToInt32($clean.Substring(0, 2), 16),
    [Convert]::ToInt32($clean.Substring(2, 2), 16),
    [Convert]::ToInt32($clean.Substring(4, 2), 16)
  )
}

function New-Font($family, $size, $style = [System.Drawing.FontStyle]::Regular) {
  return [System.Drawing.Font]::new($family, [single]$size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Measure-Line($graphics, $text, $font) {
  return $graphics.MeasureString($text, $font).Width
}

function Wrap-Text($graphics, $text, $font, $maxWidth) {
  $lines = [System.Collections.Generic.List[string]]::new()
  foreach ($rawLine in ($text -split "`n")) {
    $words = $rawLine -split "\s+"
    $line = ""
    foreach ($word in $words) {
      $candidate = if ($line.Length -eq 0) { $word } else { "$line $word" }
      if ((Measure-Line $graphics $candidate $font) -le $maxWidth) {
        $line = $candidate
      } else {
        if ($line.Length -gt 0) { $lines.Add($line) }
        $line = $word
      }
    }
    if ($line.Length -gt 0) { $lines.Add($line) }
  }
  return $lines
}

function Draw-WrappedText($graphics, $text, $font, $brush, $x, $y, $maxWidth, $lineHeight, $alignment = "Near") {
  $format = [System.Drawing.StringFormat]::new()
  $format.Alignment = if ($alignment -eq "Center") { [System.Drawing.StringAlignment]::Center } else { [System.Drawing.StringAlignment]::Near }
  $lines = Wrap-Text $graphics $text $font $maxWidth
  $currentY = $y
  foreach ($line in $lines) {
    $rect = [System.Drawing.RectangleF]::new([single]$x, [single]$currentY, [single]$maxWidth, [single]$lineHeight)
    $graphics.DrawString($line, $font, $brush, $rect, $format)
    $currentY += $lineHeight
  }
  $format.Dispose()
  return $currentY
}

function Fill-RoundedRect($graphics, $brush, $x, $y, $w, $h, $r) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

function Draw-Book($graphics, $x, $y, $w, $h, $color, $accent, $title) {
  $coverBrush = [System.Drawing.SolidBrush]::new($color)
  $accentBrush = [System.Drawing.SolidBrush]::new($accent)
  $darkPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(60, 0, 0, 0), 3)
  Fill-RoundedRect $graphics $coverBrush $x $y $w $h 10
  $graphics.DrawRectangle($darkPen, $x + 12, $y + 12, $w - 24, $h - 24)
  $graphics.FillRectangle($accentBrush, $x + 28, $y + 42, $w - 56, 4)
  $graphics.FillRectangle($accentBrush, $x + 28, $y + $h - 46, $w - 56, 4)

  $font = New-Font "Georgia" ([Math]::Max(22, $w / 8)) ([System.Drawing.FontStyle]::Bold)
  $small = New-Font "Arial" ([Math]::Max(10, $w / 24)) ([System.Drawing.FontStyle]::Bold)
  $titleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
  Draw-WrappedText $graphics $title $font $titleBrush ($x + 28) ($y + ($h * 0.38)) ($w - 56) ($font.Size * 1.12) "Center" | Out-Null
  $graphics.DrawString("STUDIO LOGOS", $small, $accentBrush, [System.Drawing.RectangleF]::new($x + 20, $y + $h - 82, $w - 40, 24), ([System.Drawing.StringFormat]@{ Alignment = [System.Drawing.StringAlignment]::Center }))

  $coverBrush.Dispose()
  $accentBrush.Dispose()
  $darkPen.Dispose()
  $font.Dispose()
  $small.Dispose()
  $titleBrush.Dispose()
}

function Save-Jpeg($bitmap, $path, $quality = 88L) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $encoder = [System.Drawing.Imaging.Encoder]::Quality
  $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new($encoder, [long]$quality)
  $bitmap.Save($path, $codec, $parameters)
  $parameters.Dispose()
}

function New-MarketingImage($path, $width, $height, $theme, $headline, $subhead, $cta, $layout = "portrait") {
  $bmp = [System.Drawing.Bitmap]::new($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $navy = New-Color "#111318"
  $black = New-Color "#0D0D0D"
  $ivory = New-Color "#F8F4EA"
  $paper = New-Color "#ECE4D3"
  $gold = New-Color "#C5A059"
  $gold2 = New-Color "#8A682B"
  $muted = New-Color "#D9C9A7"

  $bgTop = if ($theme -eq "light") { $ivory } elseif ($theme -eq "gold") { New-Color "#D8B76C" } else { $navy }
  $bgBottom = if ($theme -eq "light") { $paper } elseif ($theme -eq "gold") { New-Color "#8A682B" } else { $black }
  $bgBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(0, 0, $width, $height),
    $bgTop,
    $bgBottom,
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
  )
  $g.FillRectangle($bgBrush, 0, 0, $width, $height)

  $texturePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(22, 255, 255, 255), 1)
  for ($i = 0; $i -lt 80; $i++) {
    $x = ($i * 97) % $width
    $g.DrawLine($texturePen, $x, 0, $x - 280, $height)
  }

  $margin = [int]($width * 0.075)
  $isLight = $theme -eq "light"
  $textColor = if ($isLight) { $black } else { $ivory }
  $softTextColor = if ($isLight) { [System.Drawing.Color]::FromArgb(170, 0, 0, 0) } else { [System.Drawing.Color]::FromArgb(178, 255, 255, 255) }
  $brandBrush = [System.Drawing.SolidBrush]::new($gold)
  $textBrush = [System.Drawing.SolidBrush]::new($textColor)
  $softBrush = [System.Drawing.SolidBrush]::new($softTextColor)
  $panelColor = if ($isLight) { [System.Drawing.Color]::FromArgb(222, 255, 255, 255) } else { [System.Drawing.Color]::FromArgb(36, 255, 255, 255) }
  $panelBrush = [System.Drawing.SolidBrush]::new($panelColor)
  $darkPanelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(225, 17, 19, 24))

  $brandFont = New-Font "Arial" ([int]($width * 0.022)) ([System.Drawing.FontStyle]::Bold)
  $headlineScale = if ($layout -eq "square") { 0.066 } else { 0.079 }
  $subScale = if ($layout -eq "square") { 0.029 } else { 0.036 }
  $headlineFont = New-Font "Georgia" ([int]($width * $headlineScale)) ([System.Drawing.FontStyle]::Bold)
  $subFont = New-Font "Georgia" ([int]($width * $subScale)) ([System.Drawing.FontStyle]::Regular)
  $ctaFont = New-Font "Arial" ([int]($width * 0.024)) ([System.Drawing.FontStyle]::Bold)
  $smallFont = New-Font "Arial" ([int]($width * 0.019)) ([System.Drawing.FontStyle]::Bold)

  $g.DrawString("STUDIO LOGOS", $brandFont, $brandBrush, $margin, $margin)
  $g.DrawString("BIBLIOTECA CLASSICA PREMIUM", $smallFont, $softBrush, $margin, $margin + 42)

  $bookW = if ($layout -eq "square") { 170 } else { 230 }
  $bookH = [int]($bookW * 1.5)
  $bookY = if ($layout -eq "square") { 160 } else { [int]($height * 0.17) }
  $bookX = $width - $margin - $bookW
  Draw-Book $g $bookX $bookY $bookW $bookH (New-Color "#1C2638") $gold ""
  Draw-Book $g ($bookX - [int]($bookW * 0.45)) ($bookY + [int]($bookH * 0.18)) $bookW $bookH (New-Color "#5D2434") $muted ""
  Draw-Book $g ($bookX - [int]($bookW * 0.88)) ($bookY + [int]($bookH * 0.36)) $bookW $bookH (New-Color "#2E4A3D") $gold "ALPHA"

  $headlineY = if ($layout -eq "square") { 480 } else { [int]($height * 0.48) }
  $headlineW = $width - ($margin * 2)
  $endY = Draw-WrappedText $g $headline $headlineFont $textBrush $margin $headlineY $headlineW ([int]($headlineFont.Size * 1.12))
  $endY += 18
  $endY = Draw-WrappedText $g $subhead $subFont $softBrush $margin $endY $headlineW ([int]($subFont.Size * 1.42))

  $ctaY = if ($layout -eq "square") { $height - 150 } else { $height - 220 }
  $ctaH = if ($layout -eq "square") { 76 } else { 88 }
  Fill-RoundedRect $g $darkPanelBrush $margin $ctaY ($width - ($margin * 2)) $ctaH 8
  $ctaFormat = [System.Drawing.StringFormat]::new()
  $ctaFormat.Alignment = [System.Drawing.StringAlignment]::Center
  $ctaFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString($cta, $ctaFont, $brandBrush, [System.Drawing.RectangleF]::new($margin, $ctaY, $width - ($margin * 2), $ctaH), $ctaFormat)

  $footerFont = New-Font "Arial" ([int]($width * 0.019)) ([System.Drawing.FontStyle]::Bold)
  $footer = "studiologos.com.br  |  assinatura anual R$ 47"
  $g.DrawString($footer, $footerFont, $softBrush, [System.Drawing.RectangleF]::new($margin, $height - 72, $width - ($margin * 2), 34), $ctaFormat)

  $bgBrush.Dispose()
  $texturePen.Dispose()
  $brandBrush.Dispose()
  $textBrush.Dispose()
  $softBrush.Dispose()
  $panelBrush.Dispose()
  $darkPanelBrush.Dispose()
  $brandFont.Dispose()
  $headlineFont.Dispose()
  $subFont.Dispose()
  $ctaFont.Dispose()
  $smallFont.Dispose()
  $footerFont.Dispose()
  $ctaFormat.Dispose()
  $g.Dispose()
  Save-Jpeg $bmp $path 88L
  $bmp.Dispose()
}

$assets = @(
  @{ Folder = $storyDir; Prefix = "story"; Width = 1080; Height = 1920; Layout = "portrait" },
  @{ Folder = $feedDir; Prefix = "feed"; Width = 1080; Height = 1080; Layout = "square" },
  @{ Folder = $reelDir; Prefix = "reel"; Width = 1080; Height = 1920; Layout = "portrait" }
)

$campaigns = @(
  @{
    Slug = "biblioteca-premium"
    Theme = "dark"
    Headline = "Uma biblioteca classica para formar a mente."
    Subhead = "Grandes obras integrais, trilhas de estudo e leitura online em uma experiencia premium."
    Cta = "COMECE SUA LEITURA NO STUDIO LOGOS"
  },
  @{
    Slug = "filosofia-teologia-literatura"
    Theme = "light"
    Headline = "Filosofia, teologia, literatura e historia no mesmo lugar."
    Subhead = "Estude com acervo organizado, busca por tema e leitor online dentro da plataforma."
    Cta = "ACESSE A BIBLIOTECA COMPLETA"
  },
  @{
    Slug = "assinatura-anual"
    Theme = "gold"
    Headline = "Assinatura anual por R$ 47."
    Subhead = "Uma plataforma de leitura para quem quer estudar com profundidade o ano inteiro."
    Cta = "ASSINAR STUDIO LOGOS"
  },
  @{
    Slug = "classicos-essenciais"
    Theme = "dark"
    Headline = "Classicos essenciais, leitura sem distracoes."
    Subhead = "Abra a obra, continue de onde parou e avance por capitulos dentro do Studio Logos."
    Cta = "ENTRAR NA PLATAFORMA"
  },
  @{
    Slug = "formacao-intelectual"
    Theme = "light"
    Headline = "Construa sua formacao intelectual todos os dias."
    Subhead = "Roteiros de estudo para conectar autores, temas e grandes perguntas da tradicao."
    Cta = "EXPLORAR O ACERVO"
  }
)

foreach ($asset in $assets) {
  $index = 1
  foreach ($campaign in $campaigns) {
    $name = "{0}-{1:00}-{2}.jpg" -f $asset.Prefix, $index, $campaign.Slug
    $path = Join-Path $asset.Folder $name
    New-MarketingImage `
      -path $path `
      -width $asset.Width `
      -height $asset.Height `
      -theme $campaign.Theme `
      -headline $campaign.Headline `
      -subhead $campaign.Subhead `
      -cta $campaign.Cta `
      -layout $asset.Layout
    $index++
  }
}

$readme = @"
# Pacote de divulgacao Studio Logos

Formatos criados:

- STORY: 1080x1920 px
- FEED: 1080x1080 px
- REEL: 1080x1920 px

As imagens foram exportadas em JPG otimizado para Instagram, com identidade premium, chamada de assinatura anual e URL do site.

Sugestao de uso:

1. Use os Stories para chamada direta e link.
2. Use os Feeds para posts de autoridade e apresentacao do acervo.
3. Use os Reels como capas ou telas finais em videos curtos.

Texto base recomendado:

Studio Logos: biblioteca classica premium com grandes obras integrais, trilhas de estudo e leitura online. Assinatura anual R$ 47.
"@

Set-Content -Path (Join-Path $outRoot "README.txt") -Value $readme -Encoding UTF8

$zipPath = Join-Path $root "divulgacao-instagram-studiologos.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path (Join-Path $outRoot "*") -DestinationPath $zipPath -Force

Write-Host "Pacote criado em: $outRoot"
Write-Host "ZIP criado em: $zipPath"
