## Servicio en Node para PEC app

![Texto alternativo](/assets/img/claro_logo.jpg)

Se disponibilizara un nuevo servicio que recupere la información de  
trafico de datos del periodo en curso de un cliente.  

Se accede por numero de línea, filtrando desde el inicio del ciclo  
de facturación hasta el dia actual.


Se definen los siguientes datos y categorías:
- FECHA
- RADIUS_CALLING_STATION_ID    (campo línea cliente)

Categorias:
- FACEBOOK  
- INSTAGRAM 
- REDES_SOCIALES  
- COMERCIO_ELECTRONICO  
- CONTENIDO_ADULTO  
- ENTRETENIMIENTO 
- SALUD_EDUCACION_BIENESTAR 
- BUSQUEDAS_MAIL_TECNOLOGIA 
- NOTICIAS_DIARIOS_REVISTAS 
- SERVICIOS_BANCA_FINANCIERAS 
- OTROS

Se disponibilizara información en el apartado Saldo en uso, acumulado por categoría.  

También un acceso rápido a un grafico por dia, donde se podría seleccionar una   
categoría particular y visualizar el detalle de consumo por dia.

### Para probar el servicio:

- git clone https://github.com/fedeemilo/service_trafico_datos.git

- cd service_trafico_datos

- npm install

### Endpoints

- GET toda la data: / (localhost:4000)

- GET data filtrada por categoría: /:filtro (donde filtro es un nombre de categoría)

