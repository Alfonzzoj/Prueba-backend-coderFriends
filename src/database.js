const mongoose = require('mongoose');

main()
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost/nodetest-db');
}