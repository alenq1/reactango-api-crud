Primero
 - setear settings si hay algo adicional, agregar apps y herramientas
 - definicion de modelos con manager, abstract model comun, generador uuid, relaciones de PK y FK
 - llenado aleatorio de datos con faker en populate.py
 - (pendiente)revisar paquete django-extension para graficar base de datos pero falta modulo graphviz para eso

Segundo
 - creacion de url de entrada para index como templateview
 - creacion de plantilla base para las demas paginas
 - creacion del html del index
 - setear en settings.py directorio de templates en la ruta del proyecto en TEMPLATES/DIRS
 - crear carpeta static en ruta del proyecto 
 - agreagado de apps necesarias de estilo en settings.py
 - creacion de pagina de inicio con index
  
Tercero
 - Setear las urls de la aplicacion externa e interna (crear archivo url dentrode apps)
 - agregar en settings.py estilo de crispy forms (revisar con paquete bootstrap4 en apps installed)
 - creacion de las demas urls con views genericas de autenticacion (login, logout, reset passwd, etc)
 - creacion de plantillas para estas demas vistas
 - setear en settings.py redirect de login
 - modificacion en passwordreset down, agregado resverse_lazy en url de app
 
Cuarto
 - Creacion de index de app una vez logueado
 - creacion de vistas genericas y urls CRUD y LDT para Modelo producto
 - templates para estas vistas
 - update view hay que agregar campos a modificar
 - para submit de ipdate y delete configurar acciones posteriores
 - importar modulos para permisos de login  y permisos requeridos como mixin xq es classBasedViews

Cinco
 - Crear serializadores (serializers.py) y crear clases de vistas (viewsets)
 - configurar routing de api
 - creacion de modelviewsets en views.py para accesso CRUD por medio de api
 - Agregado de paginacion en list view y en ordenacion en Product model ademas en plantilla de lista
 - En serializers los campos que tengan relacion, se definen con RelatedField
 - para visualizar serializer anidados (nested) se invoca al serializador el cual esta relacionado
 - Autenticacion y permisos por token y sesion a las viewsets (Elegir cual es mejor), agregado en apps de settings.py de opcion de auth token
 - En archivo urls.py princiapal se agrego ruta para obtener el token para api
 
 - instalacion de cors-headers para acceso externo de api, agregado en settings.py
 - instlacion de simplejwt para mejorar acceso y seguridad por token jwt, se agrega en settings y en views
 - agregar en views authenticacion que viene con la libreria simplejwt, ya que se solapa la que veien en drf por defecto

Seis
- Cambios esteticos de bootstrap con tablas, botones y enlazado entre paginas
- Creado serializer y vista para creacion de usuario para registro, se uso un hibrido de model y personalizado en entrada de datos 
- En el front se creo una tab en formulario para registro de user(mejorar)
