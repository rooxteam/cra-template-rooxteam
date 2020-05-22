// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const dotenvPlugin = require('cypress-dotenv')
const { install, ensureBrowserFlags } = require('@neuralegion/cypress-har-generator')
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, baseConfig) => {
  const config = dotenvPlugin(baseConfig)
  install(on, config)

  on('before:browser:launch', (browser = {}, launchOptions) => {
    ensureBrowserFlags(browser, launchOptions)
    return launchOptions
  })

  return config
}
