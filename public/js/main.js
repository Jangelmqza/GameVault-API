// Estado global de la aplicación
const state = {
    currentPage: 1,
    filters: {
        name: '',
        genre: '',
        platform: '',
        year: ''
    }
};

// Selectores del DOM
const gamesContainer = document.getElementById('games-container');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const platformFilter = document.getElementById('platform-filter');
const yearFilter = document.getElementById('year-filter');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

const totalGamesEl = document.getElementById('total-games');
const totalGenresEl = document.getElementById('total-genres');
const totalPlatformsEl = document.getElementById('total-platforms');

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
    fetchGames();
    
    // Event Listeners
    searchInput.addEventListener('input', debounce(() => {
        state.filters.name = searchInput.value;
        state.currentPage = 1;
        fetchGames();
    }, 500));

    genreFilter.addEventListener('change', () => {
        state.filters.genre = genreFilter.value;
        state.currentPage = 1;
        fetchGames();
    });

    platformFilter.addEventListener('change', () => {
        state.filters.platform = platformFilter.value;
        state.currentPage = 1;
        fetchGames();
    });

    yearFilter.addEventListener('change', () => {
        state.filters.year = yearFilter.value;
        state.currentPage = 1;
        fetchGames();
    });

    prevBtn.addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            fetchGames();
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('click', () => {
        state.currentPage++;
        fetchGames();
        window.scrollTo({ top: 400, behavior: 'smooth' });
    });
});

/**
 * Carga datos iniciales para los filtros y dashboard
 */
async function loadInitialData() {
    try {
        const [genresRes, platformsRes, yearsRes] = await Promise.all([
            fetch('/api/genre'),
            fetch('/api/platform'),
            fetch('/api/year')
        ]);

        const genres = await genresRes.json();
        const platforms = await platformsRes.json();
        const years = await yearsRes.json();

        // Poblar filtros
        genres.results.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.name;
            opt.textContent = g.name.toUpperCase();
            genreFilter.appendChild(opt);
        });

        platforms.results.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.short_name;
            opt.textContent = p.name.toUpperCase();
            platformFilter.appendChild(opt);
        });

        years.results.forEach(y => {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            yearFilter.appendChild(opt);
        });

        // Dashboard Stats
        totalGenresEl.textContent = genres.info.count;
        totalPlatformsEl.textContent = platforms.info.count;
    } catch (error) {
        console.error("Error loading initial data:", error);
    }
}

/**
 * Obtiene y renderiza los juegos según el estado actual
 */
async function fetchGames() {
    showLoading();
    
    try {
        const queryParams = new URLSearchParams({
            page: state.currentPage,
            name: state.filters.name,
            genre: state.filters.genre,
            platform: state.filters.platform,
            year: state.filters.year
        });

        const response = await fetch(`/api/game?${queryParams}`);
        const data = await response.json();

        renderGames(data.results);
        updatePagination(data.info);
        
        // Actualizar total de juegos en dashboard (solo la primera vez o según búsqueda)
        if (totalGamesEl.textContent === "0" || state.filters.name || state.filters.genre || state.filters.platform || state.filters.year) {
            totalGamesEl.textContent = data.info.count;
        }
    } catch (error) {
        console.error("Error fetching games:", error);
        gamesContainer.innerHTML = `<div class="loading-message" style="color: var(--neon-magenta)">SYSTEM ERROR: UNABLE TO RETRIEVE DATA</div>`;
    }
}

/**
 * Renderiza las cards de los juegos
 */
function renderGames(games) {
    if (!games || games.length === 0) {
        gamesContainer.innerHTML = `<div class="loading-message">NO GAMES FOUND IN THIS SECTOR</div>`;
        return;
    }

    gamesContainer.innerHTML = games.map(game => `
        <article class="game-card">
            <div class="game-card-info">
                <h3 class="game-card-title">${game.name}</h3>
                <div class="game-meta">
                    <span>${game.year}</span>
                    <span class="game-rating">★ ${game.rating}</span>
                </div>
                <div class="game-meta" style="font-size: 0.75rem; margin-top: 10px;">
                    <span>DEV: ${game.developer}</span>
                </div>
                <div class="platforms-list" style="margin-top: 10px;">
                    ${game.platforms.map(p => `<span style="font-size: 0.6rem; border: 1px solid #444; padding: 2px 4px; margin-right: 4px; color: var(--neon-cyan)">${p}</span>`).join('')}
                </div>
                <span class="game-genre">${game.genre_name ? game.genre_name.toUpperCase() : 'ACTION'}</span>
            </div>
        </article>
    `).join('');
}

/**
 * Actualiza los controles de paginación
 */
function updatePagination(info) {
    pageInfo.textContent = `PAGE ${state.currentPage} / ${info.pages || 1}`;
    prevBtn.disabled = !info.prev;
    nextBtn.disabled = !info.next;
}

function showLoading() {
    gamesContainer.innerHTML = `<div class="loading-message">SCANNING DATABASE...</div>`;
}

/**
 * Utilidad: Debounce para el buscador
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
