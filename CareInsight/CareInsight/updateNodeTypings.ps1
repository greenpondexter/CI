$path = Get-Location 
(Get-Content '.\node_modules\alasql\dist\alasql.d.ts').replace('parse(sql)', 'parse(sql:any)') | Set-Content '.\node_modules\alasql\dist\alasql.d.ts' 