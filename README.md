
# 📦 Frontend - Gestión de Inventario  

## 📌 Descripción  

Esta aplicación frontend, desarrollada en **React**, permite a los usuarios gestionar un inventario de productos a través de una API. La aplicación proporciona una interfaz intuitiva para realizar operaciones como:  

- Visualizar productos  
- Agregar nuevos productos  
- Editar información de productos  
- Eliminar productos del inventario
- Registrar usuarios (clientes - administradores)
- Registro de movimientos (Entreadas - Salidas)
- Filtrar movimientos (Entradas - Salidas)
- Realizacion de compras
- Generacion de facturas de compras

## ⚙️ Instalación  

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:  

```bash
# Clonar el repositorio  
git clone https://github.com/camilo0999/front-inventario.git  

# Acceder al directorio del proyecto  
cd front-inventario  

# Instalar dependencias  
npm install  

# Iniciar la aplicación  
npm start  
```

La aplicación estará disponible en [`http://localhost:3000`](http://localhost:3000).  

## 🌐 Configuración de la API  

Para que la aplicación funcione correctamente, es necesario configurar la URL base de la API de gestión de productos. Esto se puede hacer de dos maneras:  

1. **Modificando el archivo de configuración:** Edita el archivo donde se define la URL de la API y reemplázala por la dirección correspondiente.  
2. **Usando una variable de entorno:** Define una variable de entorno con la URL de la API.  

## 🚀 Despliegue  

La aplicación puede ser desplegada en servicios como:  

- **Render**  
- **Netlify**  
- **Vercel**  

Asegúrate de configurar correctamente las variables de entorno para la API en el entorno de producción.  

## 🛠️ Tecnologías Utilizadas  

- **React** - Biblioteca principal  
- **React Router** - Gestión de rutas  
- **Axios** - Consumo de API  
- [Añadir otras librerías o frameworks utilizados]  

## 📂 Estructura del Proyecto  

Descripción de la estructura de carpetas y archivos principales:  

- `/src`  
  - `/components` - Componentes reutilizables  
  - `/pages` - Páginas principales de la aplicación  
  - `/services` - Módulos para interactuar con la API  
  - `/styles` - Archivos de estilos CSS  
  - `App.js` - Componente principal de la aplicación  
  - `index.js` - Punto de entrada de la aplicación  

## 🧑‍💻 Contribución  

Si deseas contribuir al proyecto, sigue estos pasos:  

1. Haz un **fork** del repositorio.  
2. Crea una nueva rama:  
   ```bash
   git checkout -b feature/nueva-funcionalidad  
   ```  
3. Realiza tus cambios y haz **commit**:  
   ```bash
   git commit -m "Agregar nueva funcionalidad"  
   ```  
4. Haz **push** a la rama:  
   ```bash
   git push origin feature/nueva-funcionalidad  
   ```  
5. Abre un **Pull Request** en GitHub.  

## 📝 Licencia  

Este proyecto está bajo la licencia [MIT](LICENSE).  

## 🎥 Video Explicativo  

Para una explicación detallada de la aplicación, puedes ver el siguiente video en YouTube:  

[![Video Explicativo](https://img.youtube.com/vi/7GT-wPXyyhc/0.jpg)](https://www.youtube.com/watch?v=7GT-wPXyyhc)  

## 🌐 Despliegue en Netlify  

La aplicación está desplegada en **Netlify** y puede ser accedida desde la siguiente URL:  

🔗 [**Inventario 360**](https://inventario360.netlify.app/)  

> **Nota:** Asegúrate de configurar correctamente las variables de entorno para la API en el entorno de producción.  
