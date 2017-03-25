if (DEVELOPMENT) {
   module.exports = require('./configureStore.dev');
} else {
   module.exports = require('./configureStore.prod');
}