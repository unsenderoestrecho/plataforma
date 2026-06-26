# Un Sendero Estrecho — Guía de despliegue

## Estructura del proyecto

```
un-sendero-estrecho/
├── index.html                  ← Landing page pública
├── acceso.html                 ← Página de ingreso con código
├── netlify.toml                ← Configuración de Netlify
├── admin/
│   ├── index.html              ← Panel CMS (Decap CMS)
│   └── config.yml              ← Configuración del CMS
├── assets/
│   ├── css/style.css           ← Sistema de diseño completo
│   ├── js/main.js              ← JavaScript principal
│   └── img/                   ← Imágenes (logo, uploads)
├── content/
│   ├── cursos/                 ← Archivos .md de cursos (gestionados por CMS)
│   └── articulos/              ← Archivos .md de artículos (gestionados por CMS)
├── contenido/
│   ├── index.html              ← Hub privado (post-acceso)
│   └── cursos/
│       └── estoicismo.html     ← Template de curso individual
└── functions/
    └── validar-acceso.js       ← Función serverless de validación
```

---

## Paso a paso: subir a GitHub y conectar con Netlify

### 1. Crear el repositorio en GitHub

1. Ir a github.com → New repository
2. Nombre: `un-sendero-estrecho`
3. Privado o público (recomendado: privado)
4. NO inicializar con README

### 2. Subir los archivos

```bash
cd un-sendero-estrecho
git init
git add .
git commit -m "MVP inicial - Un Sendero Estrecho"
git remote add origin https://github.com/TU_USUARIO/un-sendero-estrecho.git
git push -u origin main
```

### 3. Conectar con Netlify

1. Ir a app.netlify.com → Add new site → Import an existing project
2. Conectar con GitHub → seleccionar el repo `un-sendero-estrecho`
3. Build settings:
   - Build command: (dejar vacío)
   - Publish directory: `.`
4. Deploy site

### 4. Configurar los códigos de acceso

En Netlify Dashboard:
1. Site settings → Environment variables
2. Agregar: `CODIGOS_ACCESO` = `SENDERO2024,BECA2024,CODIGO3`
   (separados por comas, sin espacios)

### 5. Activar el CMS (Decap CMS)

1. En Netlify Dashboard → Identity → Enable Identity
2. Identity → Git Gateway → Enable Git Gateway
3. Identity → Registration → Invite only
4. Invitarte a vos mismo: Identity → Invite users → tu email
5. Acceder al CMS en: `https://tu-sitio.netlify.app/admin`

---

## Agregar nuevos códigos de acceso

En Netlify Dashboard → Site settings → Environment variables → `CODIGOS_ACCESO`
Agregar el nuevo código separado por coma. Los cambios aplican en el próximo deploy.

## Agregar cursos o artículos

1. Ir a `tu-sitio.netlify.app/admin`
2. Iniciar sesión con tu cuenta
3. Crear nuevo curso o artículo desde el panel visual
4. Publicar → Netlify hace el deploy automáticamente

## Actualizar links de pago

En `index.html`, buscar las líneas:
```html
href="https://www.mercadopago.com.ar"
href="https://www.paypal.com"
```
Reemplazar por los links reales de tu cuenta de MP y PayPal.

## Dominio propio (opcional)

En Netlify Dashboard → Domain settings → Add custom domain
Seguir las instrucciones para apuntar tu DNS.
