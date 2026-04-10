const db = require('../config/database');
const { createTables } = require('../models/schema');

const genres = [
    'Action', 'Adventure', 'RPG', 'Shooter', 'Platformer', 
    'Sports', 'Racing', 'Fighting', 'Simulation', 'Strategy', 'Puzzle'
];

const platforms = [
    { name: 'PlayStation 5', short_name: 'PS5', manufacturer: 'Sony' },
    { name: 'PlayStation 4', short_name: 'PS4', manufacturer: 'Sony' },
    { name: 'Xbox Series X', short_name: 'XboxSX', manufacturer: 'Microsoft' },
    { name: 'Xbox One', short_name: 'XboxOne', manufacturer: 'Microsoft' },
    { name: 'Nintendo Switch', short_name: 'Switch', manufacturer: 'Nintendo' },
    { name: 'PC', short_name: 'PC', manufacturer: 'Various' },
    { name: 'Wii U', short_name: 'WiiU', manufacturer: 'Nintendo' },
    { name: 'Nintendo 64', short_name: 'N64', manufacturer: 'Nintendo' },
    { name: 'Super Nintendo', short_name: 'SNES', manufacturer: 'Nintendo' }
];

const games = [
    { name: 'The Legend of Zelda: Breath of the Wild', year: 2017, developer: 'Nintendo', rating: 9.7, genre: 'Adventure', platforms: ['Switch', 'WiiU'] },
    { name: 'Elden Ring', year: 2022, developer: 'FromSoftware', rating: 9.6, genre: 'RPG', platforms: ['PS5', 'PS4', 'XboxSX', 'XboxOne', 'PC'] },
    { name: 'The Witcher 3: Wild Hunt', year: 2015, developer: 'CD Projekt Red', rating: 9.8, genre: 'RPG', platforms: ['PS4', 'XboxOne', 'PC', 'Switch'] },
    { name: 'God of War Ragnarök', year: 2022, developer: 'Santa Monica Studio', rating: 9.4, genre: 'Action', platforms: ['PS5', 'PS4'] },
    { name: 'Super Mario Odyssey', year: 2017, developer: 'Nintendo', rating: 9.7, genre: 'Platformer', platforms: ['Switch'] },
    { name: 'Halo Infinite', year: 2021, developer: '343 Industries', rating: 8.7, genre: 'Shooter', platforms: ['XboxSX', 'XboxOne', 'PC'] },
    { name: 'Red Dead Redemption 2', year: 2018, developer: 'Rockstar Games', rating: 9.7, genre: 'Adventure', platforms: ['PS4', 'XboxOne', 'PC'] },
    { name: 'Spider-Man 2', year: 2023, developer: 'Insomniac Games', rating: 9.0, genre: 'Action', platforms: ['PS5'] },
    { name: 'Final Fantasy VII Rebirth', year: 2024, developer: 'Square Enix', rating: 9.2, genre: 'RPG', platforms: ['PS5'] },
    { name: 'Cyberpunk 2077', year: 2020, developer: 'CD Projekt Red', rating: 8.6, genre: 'RPG', platforms: ['PS5', 'XboxSX', 'PC'] },
    { name: 'Super Mario 64', year: 1996, developer: 'Nintendo', rating: 9.4, genre: 'Platformer', platforms: ['N64'] },
    { name: 'Chrono Trigger', year: 1995, developer: 'Square', rating: 9.9, genre: 'RPG', platforms: ['SNES'] },
    // ... Se añadirán más juegos programáticamente para llegar a 100+
];

// Generar juegos adicionales para completar la lista
const additionalGames = [
    { name: 'Grand Theft Auto V', year: 2013, developer: 'Rockstar North', rating: 9.6, genre: 'Action', platforms: ['PS4', 'XboxOne', 'PC', 'PS5'] },
    { name: 'The Last of Us Part II', year: 2020, developer: 'Naughty Dog', rating: 9.3, genre: 'Action', platforms: ['PS4', 'PS5'] },
    { name: 'Hades', year: 2020, developer: 'Supergiant Games', rating: 9.3, genre: 'RPG', platforms: ['PC', 'Switch', 'PS5', 'XboxSX'] },
    { name: 'Baldur\'s Gate 3', year: 2023, developer: 'Larian Studios', rating: 9.6, genre: 'RPG', platforms: ['PC', 'PS5', 'XboxSX'] },
    { name: 'Forza Horizon 5', year: 2021, developer: 'Playground Games', rating: 9.2, genre: 'Racing', platforms: ['XboxSX', 'XboxOne', 'PC'] },
    { name: 'Street Fighter 6', year: 2023, developer: 'Capcom', rating: 9.2, genre: 'Fighting', platforms: ['PS5', 'PS4', 'XboxSX', 'PC'] },
    { name: 'Stardew Valley', year: 2016, developer: 'ConcernedApe', rating: 9.5, genre: 'Simulation', platforms: ['PC', 'Switch', 'PS4', 'XboxOne'] },
    { name: 'Persona 5 Royal', year: 2019, developer: 'Atlus', rating: 9.5, genre: 'RPG', platforms: ['PS4', 'PS5', 'Switch', 'PC'] },
    { name: 'Doom Eternal', year: 2020, developer: 'id Software', rating: 9.0, genre: 'Shooter', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Resident Evil 4 Remake', year: 2023, developer: 'Capcom', rating: 9.3, genre: 'Action', platforms: ['PS5', 'PS4', 'XboxSX', 'PC'] },
    { name: 'Sekiro: Shadows Die Twice', year: 2019, developer: 'FromSoftware', rating: 9.1, genre: 'Action', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Bloodborne', year: 2015, developer: 'FromSoftware', rating: 9.1, genre: 'RPG', platforms: ['PS4'] },
    { name: 'Ghost of Tsushima', year: 2020, developer: 'Sucker Punch', rating: 8.9, genre: 'Action', platforms: ['PS4', 'PS5', 'PC'] },
    { name: 'Horizon Forbidden West', year: 2022, developer: 'Guerrilla Games', rating: 8.8, genre: 'Action', platforms: ['PS5', 'PS4'] },
    { name: 'Ratchet & Clank: Rift Apart', year: 2021, developer: 'Insomniac Games', rating: 8.8, genre: 'Platformer', platforms: ['PS5', 'PC'] },
    { name: 'Demon\'s Souls', year: 2020, developer: 'Bluepoint Games', rating: 9.2, genre: 'RPG', platforms: ['PS5'] },
    { name: 'Gran Turismo 7', year: 2022, developer: 'Polyphony Digital', rating: 8.7, genre: 'Racing', platforms: ['PS5', 'PS4'] },
    { name: 'Returnal', year: 2021, developer: 'Housemarque', rating: 8.6, genre: 'Shooter', platforms: ['PS5', 'PC'] },
    { name: 'Sea of Thieves', year: 2018, developer: 'Rare', rating: 8.5, genre: 'Adventure', platforms: ['XboxOne', 'XboxSX', 'PC'] },
    { name: 'Gears 5', year: 2019, developer: 'The Coalition', rating: 8.4, genre: 'Shooter', platforms: ['XboxOne', 'XboxSX', 'PC'] },
    { name: 'Starfield', year: 2023, developer: 'Bethesda Game Studios', rating: 8.3, genre: 'RPG', platforms: ['XboxSX', 'PC'] },
    { name: 'Metroid Dread', year: 2021, developer: 'MercurySteam', rating: 8.8, genre: 'Adventure', platforms: ['Switch'] },
    { name: 'Animal Crossing: New Horizons', year: 2020, developer: 'Nintendo', rating: 9.0, genre: 'Simulation', platforms: ['Switch'] },
    { name: 'Mario Kart 8 Deluxe', year: 2017, developer: 'Nintendo', rating: 9.3, genre: 'Racing', platforms: ['Switch'] },
    { name: 'Splatoon 3', year: 2022, developer: 'Nintendo', rating: 8.3, genre: 'Shooter', platforms: ['Switch'] },
    { name: 'Xenoblade Chronicles 3', year: 2022, developer: 'Monolith Soft', rating: 8.9, genre: 'RPG', platforms: ['Switch'] },
    { name: 'Fire Emblem Engage', year: 2023, developer: 'Intelligent Systems', rating: 8.0, genre: 'Strategy', platforms: ['Switch'] },
    { name: 'Pikmin 4', year: 2023, developer: 'Nintendo', rating: 8.7, genre: 'Strategy', platforms: ['Switch'] },
    { name: 'Super Smash Bros. Ultimate', year: 2018, developer: 'Nintendo', rating: 9.3, genre: 'Fighting', platforms: ['Switch'] },
    { name: 'Mass Effect Legendary Edition', year: 2021, developer: 'BioWare', rating: 9.0, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'The Elder Scrolls V: Skyrim', year: 2011, developer: 'Bethesda Game Studios', rating: 9.4, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Minecraft', year: 2011, developer: 'Mojang', rating: 9.3, genre: 'Simulation', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Portal 2', year: 2011, developer: 'Valve', rating: 9.5, genre: 'Puzzle', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Dark Souls III', year: 2016, developer: 'FromSoftware', rating: 8.9, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'It Takes Two', year: 2021, developer: 'Hazelight Studios', rating: 8.9, genre: 'Platformer', platforms: ['PC', 'PS4', 'XboxOne', 'PS5', 'XboxSX', 'Switch'] },
    { name: 'Cuphead', year: 2017, developer: 'Studio MDHR', rating: 8.8, genre: 'Platformer', platforms: ['PC', 'XboxOne', 'Switch', 'PS4'] },
    { name: 'Outer Wilds', year: 2019, developer: 'Mobius Digital', rating: 8.5, genre: 'Adventure', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Hollow Knight', year: 2017, developer: 'Team Cherry', rating: 9.0, genre: 'Platformer', platforms: ['PC', 'Switch', 'PS4', 'XboxOne'] },
    { name: 'Celeste', year: 2018, developer: 'Maddy Makes Games', rating: 9.1, genre: 'Platformer', platforms: ['PC', 'Switch', 'PS4', 'XboxOne'] },
    { name: 'Undertale', year: 2015, developer: 'tobyfox', rating: 9.2, genre: 'RPG', platforms: ['PC', 'PS4', 'Switch', 'XboxOne'] },
    { name: 'Disco Elysium', year: 2019, developer: 'ZA/UM', rating: 9.1, genre: 'RPG', platforms: ['PC', 'PS4', 'PS5', 'Switch', 'XboxOne', 'XboxSX'] },
    { name: 'Control', year: 2019, developer: 'Remedy Entertainment', rating: 8.5, genre: 'Action', platforms: ['PC', 'PS4', 'XboxOne', 'PS5', 'XboxSX', 'Switch'] },
    { name: 'Death Stranding', year: 2019, developer: 'Kojima Productions', rating: 8.2, genre: 'Adventure', platforms: ['PS4', 'PS5', 'PC'] },
    { name: 'Devil May Cry 5', year: 2019, developer: 'Capcom', rating: 8.8, genre: 'Action', platforms: ['PC', 'PS4', 'XboxOne', 'PS5', 'XboxSX'] },
    { name: 'Monster Hunter: World', year: 2018, developer: 'Capcom', rating: 9.0, genre: 'Action', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Assassin\'s Creed Valhalla', year: 2020, developer: 'Ubisoft Montreal', rating: 8.0, genre: 'Adventure', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Fallout 4', year: 2015, developer: 'Bethesda Game Studios', rating: 8.7, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Dishonored 2', year: 2016, developer: 'Arkane Studios', rating: 8.8, genre: 'Action', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Ori and the Will of the Wisps', year: 2020, developer: 'Moon Studios', rating: 9.0, genre: 'Platformer', platforms: ['PC', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'Alan Wake II', year: 2023, developer: 'Remedy Entertainment', rating: 8.9, genre: 'Adventure', platforms: ['PC', 'PS5', 'XboxSX'] },
    { name: 'Armored Core VI: Fires of Rubicon', year: 2023, developer: 'FromSoftware', rating: 8.7, genre: 'Action', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Street Fighter V', year: 2016, developer: 'Capcom', rating: 7.4, genre: 'Fighting', platforms: ['PC', 'PS4'] },
    { name: 'Tekken 8', year: 2024, developer: 'Bandai Namco', rating: 9.0, genre: 'Fighting', platforms: ['PC', 'PS5', 'XboxSX'] },
    { name: 'Mortal Kombat 1', year: 2023, developer: 'NetherRealm Studios', rating: 8.4, genre: 'Fighting', platforms: ['PC', 'PS5', 'XboxSX', 'Switch'] },
    { name: 'Sifu', year: 2022, developer: 'Sloclap', rating: 8.1, genre: 'Action', platforms: ['PC', 'PS4', 'PS5', 'Switch', 'XboxOne', 'XboxSX'] },
    { name: 'Dragon Age: Inquisition', year: 2014, developer: 'BioWare', rating: 8.9, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Overwatch', year: 2016, developer: 'Blizzard Entertainment', rating: 9.1, genre: 'Shooter', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Rocket League', year: 2015, developer: 'Psyonix', rating: 8.5, racing: 'Racing', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'FIFA 23', year: 2022, developer: 'EA Sports', rating: 7.7, genre: 'Sports', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'NBA 2K24', year: 2023, developer: 'Visual Concepts', rating: 6.8, genre: 'Sports', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'Gran Turismo Sport', year: 2017, developer: 'Polyphony Digital', rating: 7.5, genre: 'Racing', platforms: ['PS4'] },
    { name: 'Assetto Corsa Competizione', year: 2019, developer: 'Kunos Simulazioni', rating: 8.0, genre: 'Racing', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'F1 23', year: 2023, developer: 'Codemasters', rating: 8.2, genre: 'Racing', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Civilization VI', year: 2016, developer: 'Firaxis Games', rating: 8.8, genre: 'Strategy', platforms: ['PC', 'Switch', 'PS4', 'XboxOne'] },
    { name: 'StarCraft II: Wings of Liberty', year: 2010, developer: 'Blizzard Entertainment', rating: 9.3, genre: 'Strategy', platforms: ['PC'] },
    { name: 'Age of Empires IV', year: 2021, developer: 'Relic Entertainment', rating: 8.1, genre: 'Strategy', platforms: ['PC', 'XboxSX', 'XboxOne'] },
    { name: 'XCOM 2', year: 2016, developer: 'Firaxis Games', rating: 8.8, genre: 'Strategy', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Divinity: Original Sin II', year: 2017, developer: 'Larian Studios', rating: 9.3, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Total War: Warhammer III', year: 2022, developer: 'Creative Assembly', rating: 8.5, genre: 'Strategy', platforms: ['PC'] },
    { name: 'Microsoft Flight Simulator', year: 2020, developer: 'Asobo Studio', rating: 9.1, genre: 'Simulation', platforms: ['PC', 'XboxSX'] },
    { name: 'The Sims 4', year: 2014, developer: 'Maxis', rating: 7.0, genre: 'Simulation', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Cities: Skylines', year: 2015, developer: 'Colossal Order', rating: 8.5, genre: 'Simulation', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Kerbal Space Program', year: 2015, developer: 'Squad', rating: 8.8, genre: 'Simulation', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Euro Truck Simulator 2', year: 2012, developer: 'SCS Software', rating: 8.5, genre: 'Simulation', platforms: ['PC'] },
    { name: 'Tunic', year: 2022, developer: 'Andrew Shouldice', rating: 8.5, genre: 'Adventure', platforms: ['PC', 'Switch', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Stray', year: 2022, developer: 'BlueTwelve Studio', rating: 8.3, genre: 'Adventure', platforms: ['PC', 'PS4', 'PS5', 'XboxSX'] },
    { name: 'Sea of Stars', year: 2023, developer: 'Sabotage Studio', rating: 8.8, genre: 'RPG', platforms: ['PC', 'Switch', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Dave the Diver', year: 2023, developer: 'MINTROCKET', rating: 9.0, genre: 'Adventure', platforms: ['PC', 'Switch', 'PS4', 'PS5'] },
    { name: 'Hi-Fi RUSH', year: 2023, developer: 'Tango Gameworks', rating: 8.9, genre: 'Action', platforms: ['PC', 'XboxSX', 'PS5'] },
    { name: 'Lies of P', year: 2023, developer: 'NEOWIZ', rating: 8.4, genre: 'RPG', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Dredge', year: 2023, developer: 'Black Salt Games', rating: 8.1, genre: 'Adventure', platforms: ['PC', 'Switch', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Cocoon', year: 2023, developer: 'Geometric Interactive', rating: 8.8, genre: 'Puzzle', platforms: ['PC', 'Switch', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Vampire Survivors', year: 2022, developer: 'poncle', rating: 8.6, genre: 'Action', platforms: ['PC', 'Switch', 'XboxOne', 'XboxSX'] },
    { name: 'Inscryption', year: 2021, developer: 'Daniel Mullins Games', rating: 8.7, genre: 'Puzzle', platforms: ['PC', 'PS4', 'PS5', 'Switch', 'XboxOne', 'XboxSX'] },
    { name: 'Kena: Bridge of Spirits', year: 2021, developer: 'Ember Lab', rating: 8.2, genre: 'Adventure', platforms: ['PC', 'PS4', 'PS5'] },
    { name: 'Ghostrunner', year: 2020, developer: 'One More Level', rating: 8.1, genre: 'Action', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'Psychonauts 2', year: 2021, developer: 'Double Fine', rating: 8.9, genre: 'Platformer', platforms: ['PC', 'PS4', 'XboxOne', 'XboxSX'] },
    { name: 'Death\'s Door', year: 2021, developer: 'Acid Nerve', rating: 8.7, genre: 'Adventure', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'Loop Hero', year: 2021, developer: 'Four Quarters', rating: 8.4, genre: 'Strategy', platforms: ['PC', 'Switch', 'XboxOne'] },
    { name: 'Sable', year: 2021, developer: 'Shedworks', rating: 7.6, genre: 'Adventure', platforms: ['PC', 'XboxSX', 'PS5'] },
    { name: 'The Artful Escape', year: 2021, developer: 'Beethoven & Dinosaur', rating: 8.0, genre: 'Platformer', platforms: ['PC', 'XboxOne', 'XboxSX', 'PS4', 'PS5', 'Switch'] },
    { name: '12 Minutes', year: 2021, developer: 'Luis Antonio', rating: 7.2, genre: 'Puzzle', platforms: ['PC', 'XboxOne', 'XboxSX', 'PS4', 'PS5', 'Switch'] },
    { name: 'Outer Worlds', year: 2019, developer: 'Obsidian Entertainment', rating: 8.5, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] },
    { name: 'Sekiro', year: 2019, developer: 'FromSoftware', rating: 9.1, genre: 'Action', platforms: ['PC', 'PS4', 'XboxOne'] },
    { name: 'Life is Strange: True Colors', year: 2021, developer: 'Deck Nine', rating: 8.2, genre: 'Adventure', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'Guardians of the Galaxy', year: 2021, developer: 'Eidos-Montréal', rating: 8.4, genre: 'Action', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX', 'Switch'] },
    { name: 'Judgment', year: 2018, developer: 'Ryu Ga Gotoku Studio', rating: 8.2, genre: 'Action', platforms: ['PS4', 'PS5', 'XboxSX', 'PC'] },
    { name: 'Yakuza: Like a Dragon', year: 2020, developer: 'Ryu Ga Gotoku Studio', rating: 8.6, genre: 'RPG', platforms: ['PC', 'PS4', 'PS5', 'XboxOne', 'XboxSX'] },
    { name: 'Nier: Automata', year: 2017, developer: 'PlatinumGames', rating: 9.1, genre: 'RPG', platforms: ['PC', 'PS4', 'XboxOne', 'Switch'] }
];

const allGames = [...games, ...additionalGames];

const seed = () => {
    createTables();

    const insertGenre = db.prepare('INSERT OR IGNORE INTO genres (name) VALUES (?)');
    const insertPlatform = db.prepare('INSERT OR IGNORE INTO platforms (name, short_name, manufacturer) VALUES (?, ?, ?)');
    const insertGame = db.prepare('INSERT INTO games (name, year, developer, rating, genre_id) VALUES (?, ?, ?, ?, ?)');
    const insertGamePlatform = db.prepare('INSERT INTO game_platforms (game_id, platform_id) VALUES (?, ?)');

    const getGenreId = db.prepare('SELECT id FROM genres WHERE name = ?');
    const getPlatformId = db.prepare('SELECT id FROM platforms WHERE short_name = ?');

    const transaction = db.transaction(() => {
        // Insertar géneros
        genres.forEach(name => insertGenre.run(name));
        console.log('--- Géneros insertados');

        // Insertar plataformas
        platforms.forEach(p => insertPlatform.run(p.name, p.short_name, p.manufacturer));
        console.log('--- Plataformas insertadas');

        // Insertar juegos
        allGames.forEach(game => {
            const genreRow = getGenreId.get(game.genre || 'Action');
            const genreId = genreRow ? genreRow.id : null;

            const result = insertGame.run(game.name, game.year, game.developer, game.rating, genreId);
            const gameId = result.lastInsertRowid;

            game.platforms.forEach(shortName => {
                const platformRow = getPlatformId.get(shortName);
                if (platformRow) {
                    insertGamePlatform.run(gameId, platformRow.id);
                }
            });
        });
        console.log(`--- ${allGames.length} juegos insertados con sus plataformas`);
    });

    try {
        transaction();
        console.log("✅ Base de datos poblada con éxito.");
    } catch (error) {
        console.error("❌ Error al poblar la base de datos:", error);
    }
};

if (require.main === module) {
    seed();
}

module.exports = { seed };
