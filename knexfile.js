const pg = require('pg');
const {DB_ADDRESS, DB_PORT, DB_USERNAME,DB_PASSWORD, DB_DEV_NAME, DB_TEST_NAME} = require("./env");

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations:{
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  },
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      host : DB_ADDRESS,
      port : DB_PORT,
      user : DB_USERNAME,
      password : DB_PASSWORD,
      database : DB_DEV_NAME,
      ssl: { rejectUnauthorized: false },
    }
  },
  testing: {
    ...sharedConfig,
    connection: {
      host : DB_ADDRESS,
      port : DB_PORT,
      user : DB_USERNAME,
      password : DB_PASSWORD,
      database : DB_TEST_NAME,
      ssl: { rejectUnauthorized: false },
    }
  },

  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
  }

};
