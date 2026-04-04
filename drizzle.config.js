require('dotenv').config();

/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: './models/*.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEON_DB_URL,
  },
};