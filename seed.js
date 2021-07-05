const { Garden } = require('./models');
Garden.create([
    {
        name: 'Tomato',
        plant_id: 1,
        scientific_name: 'Solanum lycopersicum',
    },
], (err, results) => {
    console.log(results);
});