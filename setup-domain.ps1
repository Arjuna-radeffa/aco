$token = "cfut_g62pamDLL4dFcEOoIdkHmdpQkU9a9bOckPjNGR7oc02a7a68"
$accountId = "fa152694bcc0c864187cd5f524db2941"

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    domain = "aco.tigo.co.id"
} | ConvertTo-Json

$uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/aco/domains"

Write-Host "Adding custom domain: aco.tigo.co.id"
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $uri -Method Post -Headers $headers -Body $body -ErrorAction Stop
    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Host "SUCCESS: Custom domain added!"
        Write-Host ""
        Write-Host "Domain Configuration:"
        Write-Host "Domain: aco.tigo.co.id"
        Write-Host "Status: Pending (DNS may take 5-10 minutes to propagate)"
    }
    else {
        Write-Host "ERROR: $($result.errors[0].message)"
    }
}
catch {
    Write-Host "Request Failed: $($_.Exception.Message)"
}
