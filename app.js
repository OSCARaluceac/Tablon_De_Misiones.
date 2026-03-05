// Configuración de Rangos
const RANGOS = { 'D': 1, 'C': 2, 'B': 3, 'A': 4, 'S': 5 };

// Estado Global
let misiones = JSON.parse(localStorage.getItem('gremio_misiones')) || [];
let miRango = localStorage.getItem('gremio_rango') || 'D';
let miNombre = localStorage.getItem('gremio_nombre') || '';
let categoriasActivas = new Set(['Recolección', 'Exploración', 'Busca y Captura', 'Escolta', 'Caza']);

// Selectores
const listContainer = document.getElementById('lista-misiones');
const nameInput = document.getElementById('nombre-aventurero');

// Inicialización
function init() {
    nameInput.value = miNombre;
    document.querySelectorAll('.rank-dot').forEach(btn => {
        if(btn.dataset.rank === miRango) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    render();
}

// Persistencia de Nombre
nameInput.addEventListener('input', (e) => {
    localStorage.setItem('gremio_nombre', e.target.value);
});

// Lógica de Filtrado y Renderizado
function render() {
    listContainer.innerHTML = '';
    const busqueda = document.getElementById('filtro-texto').value.toLowerCase();

    misiones.forEach(m => {
        const cumpleRango = RANGOS[m.rango] <= RANGOS[miRango];
        const cumpleCat = categoriasActivas.has(m.categoria);
        const cumpleTexto = m.texto.toLowerCase().includes(busqueda);

        if (cumpleRango && cumpleCat && cumpleTexto) {
            const el = document.createElement('div');
            el.className = 'parchment-item';
            el.innerHTML = `
                <div>
                    <small style="font-family: 'Press Start 2P'; font-size: 0.5rem; opacity: 0.7">RANGO ${m.rango} | ${m.categoria}</small>
                    <p style="margin: 5px 0 0 0; font-weight: bold; font-size: 1.1rem;">${m.texto}</p>
                </div>
                <button onclick="eliminar(${m.id})" class="rank-dot" style="background: #8b0000; color: white;">X</button>
            `;
            listContainer.appendChild(el);
        }
    });
}

// Eventos de Categoría (Toggle)
document.querySelectorAll('.cat-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        btn.classList.toggle('active');
        if (categoriasActivas.has(cat)) categoriasActivas.delete(cat);
        else categoriasActivas.add(cat);
        render();
    });
});

// Cambio de Rango Aventurero
document.querySelectorAll('.rank-dot').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.rank-dot').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        miRango = btn.dataset.rank;
        localStorage.setItem('gremio_rango', miRango);
        render();
    });
});

// Crear Misión
document.getElementById('form-mision').addEventListener('submit', (e) => {
    e.preventDefault();
    const nueva = {
        id: Date.now(),
        texto: document.getElementById('input-mision').value,
        categoria: document.getElementById('select-categoria').value,
        rango: document.getElementById('select-rango').value
    };
    misiones.push(nueva);
    localStorage.setItem('gremio_misiones', JSON.stringify(misiones));
    e.target.reset();
    render();
});

// Eliminar (Completar)
window.eliminar = (id) => {
    misiones = misiones.filter(m => m.id !== id);
    localStorage.setItem('gremio_misiones', JSON.stringify(misiones));
    render();
};

document.getElementById('filtro-texto').addEventListener('input', render);
init();