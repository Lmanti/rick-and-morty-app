const axios = require('axios');
const { conn, Character, Gender, Status, Species, Location } = require('../db');

async function fetchFirstNCharacters(n = 15) {
    const charactersIds = Array.from({ length: n }, (_, i) => i + 1);
    const res = await axios.get(`https://rickandmortyapi.com/api/character/${charactersIds.join(',')}`);
    const results = res.data || [];
    return results;
}

async function syncGenders(uniqueGenders) {
    for (const g of uniqueGenders) {
        await Gender.findOrCreate({ where: { name: g } });
    }
}

async function syncStatuses(uniqueStatuses) {
    for (const s of uniqueStatuses) {
        await Status.findOrCreate({ where: { name: s } });
    }
}

async function syncSpecies(uniqueSpecies) {
    for (const s of uniqueSpecies) {
        await Species.findOrCreate({ where: { name: s } });
    }
}

async function syncLocations(uniqueLocations) {
    for (const l of uniqueLocations) {
        await Location.findOrCreate({ where: { name: l?.name, url: l?.url } });
    }
}

async function syncCharacters(characters) {
    for (const c of characters) {
        const gender = await Gender.findOne({ where: { name: c.gender } });
        const status = await Status.findOne({ where: { name: c.status } });
        const species = await Species.findOne({ where: { name: c.species } });
        const origin = await Location.findOne({ where: { name: c.origin?.name }, include: ['natives'] });
        const location = await Location.findOne({ where: { name: c.location?.name }, include: ['residents'] });
        const episodeCount = Array.isArray(c.episode) ? c.episode.length : 0;

        await Character.upsert({
            rmId: c.id,
            name: c.name,
            statusId: status?.id || null,
            speciesId: species?.id || null,
            genderId: gender?.id || null,
            type: c.type || null,
            originId: origin?.id || null,
            locationId: location?.id || null,
            image: c.image,
            episodeCount
        });
        console.log(`Inserted/Updated ${c.name}`);
    }
}

async function run() {
    try {
        await conn.sync();
        console.log('✅ DB synced');

        const characters = await fetchFirstNCharacters();
        const uniqueGenders = [...new Set(characters.map(c => c.gender))];
        const uniqueStatuses = [...new Set(characters.map(c => c.status))];
        const uniqueSpecies = [...new Set(characters.map(c => c.species))];
        const uniqueLocations = [...new Map(characters.map(c => [c.location?.name, c.location])).values()];
        const uniqueOrigins = [...new Map(characters.map(c => [c.origin?.name, c.origin])).values()];
        
        await syncGenders(uniqueGenders);
        await syncStatuses(uniqueStatuses);
        await syncSpecies(uniqueSpecies);
        await syncLocations(uniqueLocations);
        await syncLocations(uniqueOrigins);
        await syncCharacters(characters);

        console.log('✅ Seed complete');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

run();