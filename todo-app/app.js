// ==========================================
// 🌙 Dark Todo List - Local Storage App
// ==========================================

class TodoApp {
    constructor() {
        this.todos = [];
        this.filter = 'all';
        this.storageKey = 'darkTodoList';
        this.init();
    }

    // Initialize the app
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    // Setup event listeners
    setupEventListeners() {
        // Input and buttons
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Action buttons
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
    }

    // Add a new todo
    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            alert('Por favor, ingresa una tarea');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString('es-ES')
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        input.value = '';
        input.focus();
        this.render();
    }

    // Toggle todo completion status
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    // Delete a todo
    deleteTodo(id) {
        const item = document.querySelector(`[data-id="${id}"]`);
        item.classList.add('removing');
        
        setTimeout(() => {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
        }, 300);
    }

    // Set filter
    setFilter(filter) {
        this.filter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }

    // Clear completed todos
    clearCompleted() {
        if (confirm('¿Estás seguro de que quieres eliminar todas las tareas completadas?')) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
        }
    }

    // Clear all todos
    clearAll() {
        if (confirm('⚠️ ¿Estás seguro de que quieres eliminar TODAS las tareas? Esta acción no se puede deshacer.')) {
            this.todos = [];
            this.saveToStorage();
            this.render();
        }
    }

    // Get filtered todos
    getFilteredTodos() {
        switch (this.filter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'all':
            default:
                return this.todos;
        }
    }

    // Update stats
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
    }

    // Render the UI
    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filtered = this.getFilteredTodos();

        // Clear the list
        todoList.innerHTML = '';

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filtered.forEach(todo => {
                const li = this.createTodoElement(todo);
                todoList.appendChild(li);
            });
        }

        this.updateStats();
    }

    // Create a todo element
    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="app.toggleTodo(${todo.id})"
            >
            <div class="todo-content" style="flex: 1;">
                <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                <div class="todo-date">📅 ${todo.createdAt}</div>
            </div>
            <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">❌</button>
        `;

        return li;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Save to local storage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
            console.log('✅ Datos guardados en localStorage');
        } catch (error) {
            console.error('❌ Error al guardar en localStorage:', error);
        }
    }

    // Load from local storage
    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                this.todos = JSON.parse(data);
                console.log(`✅ ${this.todos.length} tarea(s) cargada(s) desde localStorage`);
            } else {
                console.log('📝 Primer uso - localStorage vacío');
            }
        } catch (error) {
            console.error('❌ Error al cargar desde localStorage:', error);
            this.todos = [];
        }
    }

    // Export todos as JSON
    exportData() {
        const data = JSON.stringify(this.todos, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import todos from JSON
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (Array.isArray(data)) {
                this.todos = data;
                this.saveToStorage();
                this.render();
                alert('✅ Datos importados correctamente');
            } else {
                alert('❌ Formato de importación inválido');
            }
        } catch (error) {
            alert('❌ Error al importar datos: ' + error.message);
        }
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
    console.log('🌙 Dark Todo List initialized!');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('todoInput').focus();
    }
});
