# SECRET SANTA

Codigo desarrollado para BetterCloud.

## PARA EJECUTAR APLICACIÓN

Se requiere *nodeJS* en el sistema.

En la carpeta raiz de la aplicación ejecuta:

### `npm install`

Y despues:

### `npm start`

Se abrira en [http://localhost:3000](http://localhost:3000) 

## PARA EJECUTAR PRUEBAS

Ejecutar:

### `npm test`

*(Se debe hacer npm install antes)*

## NOTAS DE DESARROLLO

El diseño de la estructura y plugins usados fue para demostrar mi forma de trabajo; tomando como ejemplo redux, para una aplicación sencilla era mas facil usar setState, useEffect y useMemo, sin embargo al estar presente an casi todos los stacks decidi usarlo aqui.

Otro ejemplo es el uso de un class component en la Layout y functional components en el resto del proyecto, esto igual solo fue para demostrar el uso de ambas, sin embargo es mas al diseño de la arquitectura o una necesidad especifica la que dictamina mas su uso.

Asi mismo la aplicación cuenta con un ErrorBoundary por si llegara haber algun conflicto en los componentes, poder mostrar una pantalla y manejar el registro del error.

Se uso react router para manejar el error 404 y la pantalla incial.

Se uso localStorage como base de datos local para mantener los datos introducidos.

En la parte de pruebas se uso JEST y cree un test simple para la aplicación.

En cuestion del diseño se trato de hacer la introduccion de datos es lo mas amigable posible para el usuario, tambien hacerla lo mas visualmente atractiva posible y que la aplicación fuera responsiva.

Las imagenes de fueron generadas con IA.

Por ultimo, el algoritmo de selección que utilice fue el hamilton tratando de optimizar lo mas posible el tiempo de ejecución ya que este tipo de grafo solo se puede resolver por fuerza bruta, el uso de diccionarios me ayudo a construir el grafo.

El algoritmo genera todas las combinaciones viables posibles y las acomoda respetando la regla de los 3 años, los demas no son incluidos.

### CREADO POR:

Carlos Alberto Miranda Serrano.
