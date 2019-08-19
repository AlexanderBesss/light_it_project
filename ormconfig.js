const path = require('path');

module.exports = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'light_it_project',
  entities: [path.join(__dirname, '/src/**/*.entity{.ts,.js}')],
};
