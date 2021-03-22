const mongoose = require('mongoose');
const atlas_url = process.env.MONGODB_TEST_URI;

exports.connectToDB = function connectToDB() {
    mongoose.connect(atlas_url, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on("error", function(err) {
        console.log('\n\nCould not connect to Mongo Server');
        console.log(err)
    });

    mongoose.connection.on('open', function(ref) { console.log('Connected to Mongo server'); });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('\nMongoose connection closed');
            process.exit(0);
        })
    });
}