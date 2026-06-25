import { defineConfig } from '@simapi/simapi';
import { authHandler } from './src/authHandler.js';

export default defineConfig({
  name: 'hivelari-sandbox',
  description: 'HiVelari SDK local sandbox simulation server',
  port: 3001,
  endpointsDir: 'src/endpoints',
  authHandler,
  logEntries: true,
  consoleLog: true,
  database: {
    type: 'sqlite',
    path: './.simapi/db.sqlite',
  },
});
