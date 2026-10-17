# Gazeteyi bilgisayarda denemek için küçük yerel sunucu (Windows, ek kurulum gerekmez).
# Çalıştır: powershell -ExecutionPolicy Bypass -File scripts/sunucu.ps1   → http://localhost:8765
$kok = Split-Path -Parent $PSScriptRoot
$port = 8765
$turler = @{ ".html"="text/html; charset=utf-8"; ".js"="text/javascript; charset=utf-8"; ".json"="application/json; charset=utf-8";
  ".webmanifest"="application/manifest+json"; ".svg"="image/svg+xml"; ".png"="image/png"; ".css"="text/css; charset=utf-8" }
$dinle = New-Object System.Net.HttpListener
$dinle.Prefixes.Add("http://localhost:$port/")
$dinle.Start()
Write-Host "Gazete hazır: http://localhost:$port  (durdurmak için Ctrl+C)"
while ($dinle.IsListening) {
  $c = $dinle.GetContext()
  $yol = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart('/'))
  if ($yol -eq "") { $yol = "index.html" }
  $dosya = [IO.Path]::GetFullPath((Join-Path $kok $yol))
  if ($dosya.StartsWith($kok) -and (Test-Path $dosya -PathType Leaf)) {
    $b = [IO.File]::ReadAllBytes($dosya)
    $tur = $turler[[IO.Path]::GetExtension($dosya)]
    if ($tur) { $c.Response.ContentType = $tur }
    $c.Response.Headers.Add("Cache-Control", "no-cache")
    $c.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}
