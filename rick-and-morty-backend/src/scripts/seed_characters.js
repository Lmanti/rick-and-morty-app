const axios = require('axios');
const { conn, Character } = require('../db');

async function fetchFirstNCharacters(n = 15) {
//   const perPage = 20;
    let page = 1;
    let collected = [];
    while (collected.length < n) {
        const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        const results = res.data.results || [];
        collected.push(...results);
        if (!res.data.info.next) break;
        page++;
    }
    console.log(collected);
    return collected.slice(0, n);
}

async function run() {
    try {
        await conn.sync();
        console.log('✅ DB synced');

        const chars = await fetchFirstNCharacters(15);
        for (const c of chars) {
            const episodeCount = Array.isArray(c.episode) ? c.episode.length : 0;
            await Character.upsert({
                rmId: c.id,
                name: c.name,
                status: c.status,
                species: c.species,
                type: c.type || null,
                gender: c.gender,
                origin: c.origin?.name || null,
                location: c.location?.name || null,
                image: c.image,
                episodeCount
            });
            console.log(`Inserted/Updated ${c.name}`);
        }
        console.log('Seed complete');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
}

run();