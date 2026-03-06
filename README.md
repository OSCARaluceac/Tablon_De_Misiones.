# Tablon_De_Misiones.


**TaskFlow** es una aplicación web de gestión de tareas y encargos diseñada con una estética **HD-2D** inspirada en los RPG clásicos. Este sistema permite a los usuarios organizar misiones y objetivos mediante una interfaz altamente visual, técnica y eficiente, optimizada para la productividad moderna.

---

## 🚀 Características Principales ##

**Sistema de Diseño con Tailwind CSS:** Refactorización completa utilizando clases de utilidad para un código CSS inexistente en favor de un diseño mantenible y escalable.

**Modo Oscuro (Dark Mode):** Soporte nativo para temas dinámicos. El sistema detecta y guarda la preferencia del usuario, permitiendo alternar entre una estética de pergamino claro y un modo oscuro de alto contraste.

**Filtrado Multiselectivo de Rangos:** Sistema de visualización no jerárquico que permite activar o desactivar rangos específicos (D, C, B, A, S) de forma independiente, permitiendo una personalización total del tablón.

**Categorización Táctica:** Clasificación de tareas por tipo (Recolección, Caza, Escolta, Exploración, Captura) con filtros reactivos en tiempo real.

**Persistencia de Datos:** Integración con **LocalStorage** para garantizar que los datos y las preferencias de filtrado se mantengan tras recargar la página.

---

## 🛠️ Stack Tecnológico ##

| Componente | Tecnología |
| --- | --- |
| **Estructura** | HTML5 Semántico |
| **Estilos** | Tailwind CSS (JIT Engine) |
| **Lógica** | JavaScript Vanilla (ES6+) |
| **Tipografía** | Press Start 2P & Lora (Google Fonts) |
| **Iconografía** | Emojis Unicode integrados |

---

## 🧭 Guía de Uso ##

1. Gestión de Misiones

Para publicar un nuevo encargo, introduzca el título en el panel superior, seleccione la categoría y el rango correspondiente, y pulse **"PUBLICAR"**. La misión aparecerá instantáneamente con su ribete decorativo oficial.

2. Control de Filtros

**Buscador:** Filtre por palabras clave en tiempo real.
**Rangos:** Haga clic en las siglas de rango (D-S) para alternar su visibilidad. Puede seleccionar varios a la vez.
**Categorías:** Active o desactive tipos de misiones desde el menú lateral.

3. Personalización de Interfaz

Utilice el botón **"ALTERNAR TEMA"** en la cabecera para cambiar la estética visual de la aplicación. El sistema recordará su elección en futuras sesiones.

---

## 📦 Instalación ##

1. Clonar el repositorio.
2. Asegurarse de que los archivos `index.html`, `app.js` y `tailwind-config.js` se encuentren en la misma raíz.
3. Ejecutar a través de un servidor local (ej. Live Server en VS Code) para garantizar el correcto funcionamiento de los scripts de configuración.

---
