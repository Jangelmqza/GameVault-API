// public/js/covers.js
// Módulo encargado de gestionar las portadas de los juegos usando RAWG API

const coverCache = new Map();
let apiKey = null;

// Obtener la API Key desde el servidor
async function getApiKey() {
    if (apiKey) return apiKey;
    try {
        const res = await fetch('/api/config');
        const data = await res.json();
        apiKey = data.rawgApiKey;
        return apiKey;
    } catch (error) {
        console.error("Error obteniendo la API Key de RAWG:", error);
        return null;
    }
}

// Retorna la URL de la portada o el placeholder
async function getCover(gameName) {
    if (coverCache.has(gameName)) {
        return coverCache.get(gameName);
    }
    
    const key = await getApiKey();
    if (!key || key === 'tu_api_key_aqui') {
        return getPlaceholderSVG();
    }

    try {
        const response = await fetch(`https://api.rawg.io/api/games?search=${encodeURIComponent(gameName)}&key=${key}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        if (data.results && data.results.length > 0 && data.results[0].background_image) {
            const imageUrl = data.results[0].background_image;
            coverCache.set(gameName, imageUrl);
            return imageUrl;
        } else {
            const placeholder = getPlaceholderSVG();
            coverCache.set(gameName, placeholder);
            return placeholder;
        }
    } catch (error) {
        console.error(`Error fetching cover for ${gameName}:`, error);
        const placeholder = getPlaceholderSVG();
        coverCache.set(gameName, placeholder);
        return placeholder;
    }
}

// Pre-cargar portadas en lote
async function preloadCovers(games) {
    // Precarga las portadas en segundo plano
    games.forEach(game => {
        getCover(game.name).catch(() => {});
    });
}

// Imagen placeholder SVG inline (estética retro/pixel)
function getPlaceholderSVG() {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#2d2d44"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="24" fill="#0ff" text-shadow="0 0 5px #0ff">NO COVER</text>
    </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Exportar funciones para uso global
window.coversAPI = {
    getCover,
    preloadCovers
};