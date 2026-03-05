// Configuración de Rangos y su valor numérico (D=1, S=5)
const RANGOS = { 'D': 1, 'C': 2, 'B': 3, 'A': 4, 'S': 5 };

// Estado Global de la aplicación
let misiones = JSON.parse(localStorage.getItem('gremio_misiones')) || [];
let miRango = localStorage.getItem('gremio_rango') || 'D'; // Por defecto, Rango D
let miNombre = localStorage.getItem('gremio_nombre') || '';
let categoriasActivas = new Set(['Recolección', 'Exploración', 'Busca y Captura', 'Escolta', 'Caza']);

// Selectores del DOM
const listContainer = document.getElementById('lista-misiones');
const nameInput = document.getElementById('nombre-aventurero');
const filtroTextoInput = document.getElementById('filtro-texto');

// Inicialización de la aplicación
function init() {
    if(nameInput) nameInput.value = miNombre;
    
    // Actualizar la UI del selector de rango aventurero
    document.querySelectorAll('#selector-rango-av .rank-dot').forEach(btn => {
        if(btn.dataset.rank === miRango) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // Renderizar la vista inicial
    render();
}

// Persistencia de Nombre Aventurero
nameInput?.addEventListener('input', (e) => {
    localStorage.setItem('gremio_nombre', e.target.value);
});

// Lógica de Filtrado Combinada y Renderizado Eficiente
function render() {
    if (!listContainer) return; // Seguridad técnico-táctica
    listContainer.innerHTML = '';
    
    // Capturamos el valor del buscador y eliminamos espacios laterales
    const busquedaTexto = filtroTextoInput ? filtroTextoInput.value.toLowerCase().trim() : '';

    misiones.forEach(m => {
        // Lógica de Filtrado Táctico de Rango (Jerarquía S > D solicitado)
        const rangoMisionNivel = RANGOS[m.rango];
        const miNivelAventurero = RANGOS[miRango];
        // Solo misiones de mi nivel o menores. 
        const cumpleRangoRestriccion = rangoMisionNivel <= miNivelAventurero;
        
        // Otros filtros
        const cumpleCategoriaActiva = categoriasActivas.has(m.categoria);
        const cumpleTextoBuscador = m.texto.toLowerCase().includes(busquedaTexto);

        // Si cumple TODAS las condiciones, se inyecta en el tablón
        if (cumpleRangoRestriccion && cumpleCategoriaActiva && cumpleTextoBuscador) {
            const el = document.createElement('div');
            el.className = 'parchment-item';
            
            el.innerHTML = `
                <div>
                    <small class="rango-tag">[${m.categoria}] RANGO ${m.rango}</small>
                    <p class="mision-titulo">${m.texto}</p>
                </div>
                <button onclick="eliminar(${m.id})" class="pixel-button btn-delete rank-dot active boton-eliminar">X</button>
            `;
            listContainer.appendChild(el);
        }
    });
}

// Event Listeners para controles de pulsar (HD-2D)

// Buscador
filtroTextoInput?.addEventListener('input', render);

// Filtros de Categoría
document.querySelectorAll('.cat-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        btn.classList.toggle('active');
        if (categoriasActivas.has(cat)) categoriasActivas.delete(cat);
        else categoriasActivas.add(cat);
        render(); // Refrescar vista
    });
});

// Selector de Rango Aventurero
document.querySelectorAll('#selector-rango-av .rank-dot').forEach(btn => {
    btn.addEventListener('click', () => {
        // Desactivar todos y activar solo este
        document.querySelectorAll('#selector-rango-av .rank-dot').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Actualizar estado y persistencia
        miRango = btn.dataset.rank;
        localStorage.setItem('gremio_rango', miRango);
        
        // Refrescar vista (importante para aplicar restricción de visibilidad)
        render();
    });
});

// Crear Nueva Misión (Formulario)
document.getElementById('form-mision')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nueva = {
        id: Date.now(), // Generar ID único táctico
        texto: document.getElementById('input-mision').value,
        categoria: document.getElementById('select-categoria').value,
        rango: document.getElementById('select-rango').value
    };
    // Añadir al estado y persistencia
    misiones.push(nueva);
    localStorage.setItem('gremio_misiones', JSON.stringify(misiones));
    
    // Limpiar formulario y refrescar vista
    e.target.reset();
    render();
});

// Eliminar (Completar) Misión
window.eliminar = (id) => {
    misiones = misiones.filter(m => m.id !== id);
    localStorage.setItem('gremio_misiones', JSON.stringify(misiones));
    render();
};

// Inicializar cuando el DOM esté cargado 
document.addEventListener('DOMContentLoaded', init);
