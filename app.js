// --- ESTADO ---
let misiones = JSON.parse(localStorage.getItem('taskflow_misiones')) || [];
let rangosActivos = new Set(['D', 'C', 'B', 'A', 'S']);
let categoriasActivas = new Set(['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza']);

// --- MODO OSCURO (CORREGIDO) ---
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('task_theme', newTheme);
});

// Cargar preferencia inicial
applyTheme(localStorage.getItem('task_theme') || 'light');

// --- RENDERIZADO CON BONUS DE TRANSICIÓN ---
function render() {
    const list = document.getElementById('lista-misiones');
    const busqueda = document.getElementById('filtro-texto').value.toLowerCase();
    list.innerHTML = '';

    misiones.forEach(m => {
        if (rangosActivos.has(m.rango) && categoriasActivas.has(m.categoria) && m.texto.toLowerCase().includes(busqueda)) {
            const el = document.createElement('div');
            
            // BONUS: Clases de hover y ring interior decorativo
            el.className = `p-5 bg-white dark:bg-zinc-800 border border-stone-200 dark:border-stone-700 
                            relative ring-1 ring-inset ring-gold/20 hover:ring-gold/60 
                            hover:scale-[1.01] hover:shadow-xl transition-all duration-300 
                            flex justify-between items-center group overflow-hidden`;
            
            el.innerHTML = `
                <div class="relative z-10">
                    <span class="font-pixel text-[8px] text-gold dark:text-gold/80 uppercase tracking-tighter">${m.categoria} | RANGO ${m.rango}</span>
                    <p class="text-lg font-bold text-stone-800 dark:text-stone-100 mt-1">${m.texto}</p>
                </div>
                <button onclick="eliminar(${m.id})" 
                    class="opacity-0 group-hover:opacity-100 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 font-pixel text-[8px] transition-all duration-300 rounded-sm">
                    COMPLETAR
                </button>
            `;
            list.appendChild(el);
        }
    });
}

// --- CONTROLES DINÁMICOS CON ESTADOS HOVER/FOCUS ---
function init() {
    // Filtros de Rango
    const rCont = document.getElementById('filtro-rangos');
    rCont.innerHTML = '';
    ['D', 'C', 'B', 'A', 'S'].forEach(r => {
        const btn = document.createElement('button');
        btn.textContent = r;
        btn.className = `w-10 h-10 font-pixel text-[10px] border transition-all duration-300 hover:scale-110 
            ${rangosActivos.has(r) ? 'bg-wood text-white dark:bg-gold border-wood dark:border-gold shadow-md' : 'bg-transparent text-stone-400 border-stone-300 dark:border-stone-700'}`;
        btn.onclick = () => {
            rangosActivos.has(r) ? rangosActivos.delete(r) : rangosActivos.add(r);
            init();
        };
        rCont.appendChild(btn);
    });

    // Filtros de Categoría
    const cCont = document.getElementById('filtro-categorias');
    cCont.innerHTML = '';
    ['Recolección', 'Exploración', 'Captura', 'Escolta', 'Caza'].forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c;
        btn.className = `text-left p-2 font-pixel text-[9px] transition-all duration-300 border-l-4 hover:pl-4
            ${categoriasActivas.has(c) ? 'border-gold text-stone-800 dark:text-stone-100 bg-gold/5' : 'border-transparent text-stone-400 opacity-50'}`;
        btn.onclick = () => {
            categoriasActivas.has(c) ? categoriasActivas.delete(c) : categoriasActivas.add(c);
            init();
        };
        cCont.appendChild(btn);
    });
    render();
}

// Eventos de Formulario
document.getElementById('form-mision').onsubmit = (e) => {
    e.preventDefault();
    misiones.push({
        id: Date.now(),
        texto: document.getElementById('input-mision').value,
        categoria: document.getElementById('select-categoria').value,
        rango: document.getElementById('select-rango').value
    });
    localStorage.setItem('taskflow_misiones', JSON.stringify(misiones));
    e.target.reset();
    render();
};

window.eliminar = (id) => {
    misiones = misiones.filter(m => m.id !== id);
    localStorage.setItem('taskflow_misiones', JSON.stringify(misiones));
    render();
};

document.getElementById('filtro-texto').oninput = render;
document.addEventListener('DOMContentLoaded', init);
