# ProyectoFinalAzure
Proyecto de Azure sobre automatización de herramienta como solución a problemática social.
# Proyecto de Gestión de Actividades Comunitarias

Este proyecto es una aplicación web para la *gestión de actividades comunitarias*, con autenticación de usuarios y funciones para visualizar parques, actividades y atletas registrados.  
Se desarrolló bajo una **arquitectura monolítica** y se desplegó en **Azure** mediante una máquina virtual, utilizando **Docker** para el empaquetado y aislamiento de servicios.

---

## Arquitectura

La arquitectura elegida es **monolítica** debido a:
- Simplicidad en el despliegue y mantenimiento.
- Menor complejidad para proyectos de tamaño medio.
- Integración directa entre frontend, backend y base de datos.

**Diagrama lógico de infraestructura:**
Usuario ──► Internet ──► IP Pública de Azure ──► Máquina Virtual
                                                  ├── Frontend (React + Vite + Bootstrap)
                                                  ├── Backend (Node.js + Express + JWT)
                                                  └── Base de datos (MySQL)
**Descripción:**
- **Frontend**: React con Vite y Bootstrap, consumo de API REST.
- **Backend**: Node.js + Express, manejo de lógica de negocio y autenticación con JWT.
- **Base de datos**: MySQL para persistencia de datos.
- **Docker**: Contenedores separados para frontend, backend y base de datos.

---

## Servicios de Azure utilizados

| Servicio | Función | Justificación |
|----------|---------|---------------|
| **Máquina Virtual** | Hospedaje del proyecto completo (frontend, backend, base de datos) | Permite control total del entorno y configuración personalizada. |
| **Red Virtual** | Comunicación interna y aislamiento de la VM | Garantiza seguridad y segmentación de red. |
| **IP Pública** | Acceso externo a la aplicación | Permite que los usuarios accedan desde cualquier parte de Internet. |

---

## Comandos Ejecutados:
docker network create myapp-net
docker run -d \ --name mysql_db \ --network myapp-net \ -p 3306:3306 \ -e MYSQL_ROOT_PASSWORD=TuPass123 \ -e MYSQL_DATABASE=myapp_db \ -v mysql_data:/var/lib/mysql \ mysql:8
docker build -t myapp-backend .
docker run -d --name api_backend --network myapp-net -p 3000:3000 \ -e DB_HOST=mysql_db \ -e DB_USER=root \ -e DB_PASS=TuPass123 \ -e DB_NAME=myapp_db \ myapp-backend
docker build -t myapp-frontend .
docker run -d --name web_frontend --network myapp-net -p 80:80 myapp-frontend

## Prueba
ingresar url: 20.186.17.247:5173
correo: mario@mario
contrasena: mario
