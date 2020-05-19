# cors-mofos
Get tired of CORS anywhere keep dying

Just a minimal proxy server for enabling CORS support.  

Deloy the server & make CORS request as following:  
Instead of 
```https://pokeapi.co/api/v2/ability/150/```
Do this:
```http://35.225.163.234:2301/?url=https://pokeapi.co/api/v2/ability/150/```

(Simply put the target API URL in the ```url``` query)
