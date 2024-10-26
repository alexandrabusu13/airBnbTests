import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    pageLoadTimeout: 20000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      runMode: 2,
    },
  },

  env: {
    app_url: process.env.APP_URL,
  }
});
