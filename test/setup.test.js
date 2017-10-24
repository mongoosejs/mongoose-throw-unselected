'use strict';

const mongoose = require('mongoose');

before(function(done) {
  mongoose.connect('mongodb://localhost:27017/mongooseThrowUnselected', { useMongoClient: true });

  mongoose.Promise = global.Promise;

  mongoose.connection.dropDatabase(done);
});
