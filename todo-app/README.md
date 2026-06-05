# 🌙 Dark Todo List - Aplicación de Tareas

Una aplicación moderna y elegante para gestionar tareas con almacenamiento local automático.

## 🎯 Características

- ✅ **Agregar tareas** - Crea nuevas tareas fácilmente
- ✅ **Marcar como completadas** - Marca el progreso de tus tareas
- ✅ **Eliminar tareas** - Borra tareas individuales
- ✅ **Filtros** - Visualiza todas, activas o completadas
- ✅ **Estadísticas** - Seguimiento de progreso en tiempo real
- ✅ **Almacenamiento Local** - Los datos persisten en tu navegador
- ✅ **Diseño Dark Mode** - Interfaz moderna y elegante
- ✅ **Responsive** - Funciona perfectamente en móviles y escritorio
- ✅ **Animaciones suaves** - Transiciones elegantes

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador
2. Escribe una tarea en el campo de entrada
3. Presiona "Agregar" o Enter
4. Marca como completada haciendo clic en el checkbox
5. Elimina tareas con el botón ❌

## 💾 Almacenamiento Local

La aplicación utiliza `localStorage` para guardar automáticamente tus tareas:

```javascript
// Los datos se guardan en la clave: 'darkTodoList'
localStorage.setItem('darkTodoList', JSON.stringify(todos));
```

**Ventajas:**
- ✨ Sin servidor requerido
- 🔒 Privacidad garantizada (datos locales)
- ⚡ Carga instantánea
- 📱 Funciona sin conexión

## 🎨 Tema de Colores

```css
--primary-color: #6366f1    /* Índigo */
--success-color: #10b981    /* Verde */
--danger-color: #ef4444     /* Rojo */
--warning-color: #f59e0b    /* Ámbar */
--bg-dark: #0f172a          /* Azul muy oscuro */
```

## 📊 Estructura de datos

Cada tarea se almacena como un objeto:

```javascript
{
    id: 1717520869999,              // Timestamp único
    text: "Comprar leche",          // Descripción de la tarea
    completed: false,               // Estado de completación
    createdAt: "05/06/2026 10:14"  // Fecha de creación
}
```

## 🎮 Atajos de Teclado

- **Ctrl/Cmd + K** - Enfoca el campo de entrada
- **Enter** - Agrega una nueva tarea

## 🔧 API de la Aplicación

### Métodos principales

```javascript
app.addTodo()              // Agregar nueva tarea
app.toggleTodo(id)        // Cambiar estado de completación
app.deleteTodo(id)        // Eliminar tarea
app.setFilter(filter)     // Cambiar filtro (all, active, completed)
app.clearCompleted()      // Limpiar tareas completadas
app.clearAll()            // Borrar todas las tareas
app.exportData()          // Exportar datos como JSON
app.importData(jsonString) // Importar datos desde JSON
```

## 📱 Funcionalidades Avanzadas

### Exportar datos
```javascript
app.exportData()  // Descarga un archivo JSON con todas las tareas
```

### Importar datos
```javascript
app.importData(jsonString)  // Restaura tareas desde un backup
```

## 🔒 Seguridad

- Prevención de inyección XSS mediante `escapeHtml()`
- Confirmaciones antes de eliminar datos
- Validación de entrada

## 📈 Estadísticas en Tiempo Real

- **Total de Tareas** - Conteo de todas las tareas
- **Completadas** - Tareas marcadas como completadas
- **Pendientes** - Tareas aún no completadas

## 🌐 Compatibilidad

- ✅ Chrome/Edge (V90+)
- ✅ Firefox (V88+)
- ✅ Safari (V14+)
- ✅ Navegadores móviles modernos

## 📝 Notas

- Los datos se almacenan en el navegador, no en la nube
- Si limpias el caché del navegador, perderás tus tareas
- Cada navegador/dispositivo tiene su propio almacenamiento
- Se pueden exportar datos para hacer backup

## 🎓 Conceptos de Desarrollo

Esta aplicación demuestra:

- Programación Orientada a Objetos (ES6 Classes)
- localStorage API
- Manipulación del DOM
- Event Listeners
- Array Methods (filter, find, map)
- CSS Grid y Flexbox
- Animaciones CSS
- Seguridad Frontend (XSS Prevention)

## 💡 Mejoras Futuras

- [ ] Agregar categorías/etiquetas
- [ ] Prioridades de tareas
- [ ] Fechas de vencimiento
- [ ] Recordatorios
- [ ] Sincronización en la nube
- [ ] Modo colaborativo
- [ ] Tema claro
- [ ] Atajos de teclado personalizables

## 📄 Licencia

Código abierto - Úsalo libremente

---

**Creado por:** MannyRaider79  
**Última actualización:** 2026-06-05  
**Version:** 1.0.0
