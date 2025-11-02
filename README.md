# Proyecto Desarrollo Web y Mobile - UCU Salto 2025
![a](https://img.freepik.com/free-vector/sale-background-with-cannon_81522-4044.jpg?t=st=1758292369~exp=1758295969~hmac=ec1f21eb019f9dde8364d45efc1ce53b9a208689924733c6afb32113bcc46fd5&w=1480)
___
## 📦 Primera entrega 📦 
Como equipo en esta primer entrega del proyecto, se debera describir la idea del proyecto. 
El equipo debe establecer un mínimo producto utilizable, que sea alcanzable en el desarrollo del curso.
___
### 💭 Idea general del proyecto 💭

*La idea es crear una versión simplificada de una plataforma de comercio electrónico de segunda mano. Donde los usuarios puedan vender y comprar productos de segunda mano en su comunidad. El objetivo es poner en práctica los conocimientos trabajados en la asignatura para crear una plataforma funcional que gestione usuarios, productos y la interacción entre ambos.*

**El proyecto se centrará en la experiencia del usuario, permitiendo las siguientes funciones principales:**

| Función   | Descripción   |
|--------------|--------------|
| **Registro e inicio de sesión** | Los usuarios podrán crear una cuenta y luego iniciar sesión para acceder a todas las funciones de la plataforma. |
| **Crear y publicar productos** | Una vez registrados, los usuarios podrán publicar anuncios de productos que quieran vender. Cada anuncio debe incluir el nombre del producto, una descripción, el precio y una o más fotos. |
| **Buscar y ver productos** | Los usuarios podrán navegar por todos los productos disponibles y usar una barra de búsqueda para encontrar artículos específicos. |
| **Ver detalles del producto** | Al hacer clic en un producto, el usuario verá una página con todos los detalles del artículo y la información del vendedor. |
| **Interactuar con el vendedor** | Podrán contactar al vendedor a través de un sistema de mensajería básico. |
___
## 📦 Segunda entrega 📦 

En esta segunda entrega del proyecto el equipo debera cumplir con:
  - Estructura basica de carpetas.
  - Servidor que funcionando de forma básica.
  - Historias de usuario basicas, pertenecientes al MPU.
___
## 🎭 Historias de usuario 🎭
Como primer vistazo formal a las historias de usuario el equipo decidio omitir *definition of ready and definition of done*.
Esto debido a no se pedia especificamente en la letra de la segunda entrega. 
| Titulo   | Descripción   |  Prioridad  |  Estimado  | MPU |
|--------------|--------------|--------------|--------------|--------------|
| **Registro de usuario** | **Como** nuevo usuario **quiero** poder registrarme **para** poder acceder a las funciones de la pagina | **Alta** | 5/10 | **Si** |
| **Login de usuario** | **Como** usuario registrado **quiero** poder logearme en mi cuenta **para** poder acceder a las funcionalidades de la pagina | **Alta** | 5/10 | **Si** |
| **Ver articulos** | **Como** usuario logeado **quiero** poder ver los articulos de la pagina **para** poder explorar la pagina y conocer todos los articulos publicados | **Alta** | 3/10 | **Si** |
| **Listar articulos por categoria** | **Como** usuario **quiero** poder listar los articulos de la pagina según su categoria **para** poder filtrar y explorar la pagina según mi necesidad | **Alta** | 3/10 | **Si** |
| **Publicar un articulo** | **Como** usuario logeado **quiero** poder publicar un articulo **para** poder vender el articulo y generar un beneficio | **Alta** | 5/10 | **Si** |
| **Buscar un articulo** | **Como** usuario logeado **quiero** poder buscar articulos especificos **para** poder encontrar un articulo según mi necesidad | **Media** | 3/10 | **Si** |
| **Chat con el vendedor** | **Como** usuario logeado **quiero** poder chatear con el vendedor **para** poder conocer mas información sobre el articulo publicado | **Alta** | 6/10 | No |
| **Ver detalle del articulo** | **Como** usuario logeado **quiero** poder ver los detalles del articulo **para** poder definir si comprarlo o no | **Alta** | 4/10 | No |
| **Comprar articulo** | **Como** usuario logeado **quiero** poder comprar un articulo publicado **para** poder obtener dicho articulo | **Alta** | 5/10 | **Si** |
| **Crear categorias nuevas** | **Como** administrador **quiero** poder crear nuevas categorias de articulos **para** abarcar todo lo que los usuarios quieran publicar | **Alta** | 5/10 | No |
| **Editar una categoría** | **Como** administrador **quiero** poder editar el nombre de una categoría **para** modificarla según la necesidad | **Baja** | 4/10 | No |
| **Borrar un articulo publicado** | **Como** administrador **quiero** poder borrar un articulo publicado **para** evitar articulos ilicitos | **Media** | 4/10 | **Si** |
| **Barrera de edad** | **Como** administrador **quiero** poder colocar una barrera de edad a ciertos artículos **para** evitar que los menores vean articulos ilicitos | **Baja** | 5/10 | No |
| **Eliminar un usuario** | **Como** administrador **quiero** poder eliminar el perfil de un usuario **para** sancionar al usuario por hacer algo no permitido | **Media** | 5/10 | No |
| **Editar mi articulo publicado** | **Como** usuario logeado **quiero** poder editar mi articulo publicado **para** cambiar los datos y adaptarlos | **Media** | 4/10 | **Si** |
| **Borrar un articulo publicado** | **Como** usuario logeado **quiero** poder borrar mi articulo publicado **para** que los otros usuarios ya no lo puedan ver | **Alta** | 5/10 | **Si** |
| **Eliminar mi cuenta** | **Como** usuario logeado **quiero** poder eliminar mi propia cuenta **para** dejar de acceder a la pagina | **Alta** | 6/10 | No |
| **Calificar vendedores** | **Como** usuario logeado **quiero** poder calificar a los usuarios con estrellas (1 a 5) a los usuarios que le compre un aritulo **para** que otros usuarios sepan si es confiable | **Media** | 6/10 | No |
| **Ver estrellas de vendedor** | **Como** usuario logeado **quiero** poder ver cuantas estrellas tiene otro usuario **para** saber si confiar o no en el mismo | **Media** | 5/10 | No |
| **Dejar reseña a articulo** | **Como** usuario logeado **quiero** poder dejar una reseña sobre un articulo que ya compre **para** que otros usuarios sepan si comprarlo o no | **Media** | 5/10 | No |
___
## 📦 Tercera entrega 📦 

|  En esta entrega del proyecto el equipo a cargo debera:  |
|----------------|
|  Crear todas las tablas de la base de datos  |
|  Crear un modelo gráfico de los datos  |
|  Crear datos de prueba  |

#### Para llevar a cabo esta tarea el equipo creo un archivo *init.sql* en la carpeta correspondiente.

#### Utilizamos el comando **DROP TABLE IF EXISTS tabla CASCADE**:
- Sirve para borrar la tabla y las dependencias de la misma antes de crearla
- *Esto evita que tengamos tablas repetidas al ejecutar el script.*
- *Dicho comando borra las tablas si existen, si no existen es ignorado y continua con la creación normal.*  

#### Luego de la creación de todas las tablas:
- Se realizo el insert de los datos básicos de prueba en las tablas que **consideramos más importantes.**
- Finalmente tras generar la base de datos, el equipo asocio *dbeaver con postgres* para poder *obtener el modelo grafico con notación cardinal.*

## Modelo grafico: 
![modelo](https://github.com/MatiXV23/FinalProyect_WebDev/blob/main/assets/img/DbeaverDiagram2.png?raw=true)
___
## 📦 Sexta entrega 📦 
#### En esta entrega se pidio la creación inicial del Frontend.

### En dicha entrega el equipo creo:
- Proyecto de angular para frontend.
- Esquema visual de navegación.
- Estructura de carpetas.
- Rutas registradas.

## Wireframe
![navegacion](https://github.com/MatiXV23/FinalProyect_WebDev/blob/main/assets/img/wireframeNavegacionFrontend.jpg?raw=true)

___
## 👤 Integrantes del Equipo 👤
Agustin Cigaran - Brahian Nuñez - Matias Perez
___
