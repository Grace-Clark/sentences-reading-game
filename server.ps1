param([int]$Port = 8771)

$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving $root at $prefix"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".txt"  = "text/plain; charset=utf-8"
}

try {
  while ($listener.IsListening) {
    try {
      $ctx = $listener.GetContext()
      $url = $ctx.Request.Url.LocalPath
      if ($url -eq "/" -or $url -eq "") { $url = "/index.html" }
      $rel = [Uri]::UnescapeDataString($url.TrimStart("/"))
      $file = Join-Path $root $rel
      if ((Test-Path $file -PathType Leaf)) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $ctype = $mime[$ext]
        if (-not $ctype) { $ctype = "application/octet-stream" }
        $ctx.Response.ContentType = $ctype
        $ctx.Response.SendChunked = $false
        $ctx.Response.KeepAlive = $false
        $ctx.Response.ContentLength64 = [int64]$bytes.Length
        $ctx.Response.Close($bytes, $true)
        Write-Host "200 $url ($($bytes.Length) bytes)"
      } else {
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $url")
        $ctx.Response.StatusCode = 404
        $ctx.Response.ContentType = "text/plain"
        $ctx.Response.ContentLength64 = [int64]$msg.Length
        $ctx.Response.Close($msg, $true)
        Write-Host "404 $url"
      }
    } catch {
      Write-Host "ERR handling request: $($_.Exception.Message)"
      try { $ctx.Response.Abort() } catch {}
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
