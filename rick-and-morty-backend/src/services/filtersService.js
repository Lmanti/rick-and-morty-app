const { Gender, Status, Species, Location } = require('../db');
const { setToRedis, getFromRedis } = require('../redis');
const KEY = 'FILTERS';

async function getFilterOptions() {
    try {
        const cached = await getFromRedis(KEY);
        if (cached) {            
            try {
                const parsed = JSON.parse(cached);
                return parsed;
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                throw parseError;
            }
        }

        const [species, status, gender, origins] = await Promise.all([
            Species.findAll({ 
                attributes: ['name'],
                order: [['name', 'ASC']],
                raw: true 
            }),
            Status.findAll({ 
                attributes: ['name'],
                order: [['name', 'ASC']],
                raw: true 
            }),
            Gender.findAll({ 
                attributes: ['name'],
                order: [['name', 'ASC']],
                raw: true 
            }),
            Location.findAll({ 
                attributes: ['name'],
                order: [['name', 'ASC']],
                raw: true 
            })
        ]);

        let result = {
            speciesOptions: species.map(s => s.name).filter(Boolean),
            statusOptions: status.map(s => s.name).filter(Boolean),
            genderOptions: gender.map(g => g.name).filter(Boolean),
            originOptions: origins.map(o => o.name).filter(Boolean)
        };

        await setToRedis(KEY, result);

        return result;
    } catch (error) {
        console.error('Error fetching filter options:', error);
        return {
            speciesOptions: [],
            statusOptions: [],
            genderOptions: [],
            originOptions: []
        };
    }
}

module.exports = { getFilterOptions };