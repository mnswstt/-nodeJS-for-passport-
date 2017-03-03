const databaseName = 'passport_local_knex';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://postgres:1zx2@172.17.0.2:5432/${databaseName}`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: `postgres://postgres:1zx2@172.17.0.2:5432/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
