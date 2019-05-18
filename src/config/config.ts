import 'dotenv/config'
import * as convict from 'convict'

export enum Env {
  Test = 'test',
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

const convictConfig = convict({
  app: {
    env: {
      doc: 'The current environment of the app',
      format: String,
      enum: Object.values(Env),
      default: Env.Development,
      env: 'NODE_ENV',
    },
    name: {
      doc: 'The name of the current server instance for handling loggers',
      format: String,
      default: 'Scribe API',
      env: 'API_NAME',
    },
    host: {
      doc: 'The host on which the server should run.',
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
    port: {
      doc: 'The port on which the server should run.',
      format: 'port',
      default: 12180,
      env: 'PORT',
    },
    logLevel: {
      doc: 'Logging level, can be log, console, warn, error, info',
      format: String,
      enum: Object.values(LogLevel),
      default: LogLevel.Error,
      env: 'LOG_LEVEL',
    },
  },
  newsapi: {
    key: {
      doc: 'NewsAPI.org key',
      format: String,
      default: null,
      env: 'NEWSAPI_KEY'
    }
  },
  core: {
    key: {
      doc: 'core.ac.uk key',
      format: String,
      default: null,
      env: 'CORE_KEY'
    }
  },
  azure: {
    translateKey: {
      doc: 'Portal.azure.com translate text service key',
      format: String,
      default: null,
      env: 'AZURE_TRANSLATE_KEY'
    },
    searchKey: {
      doc: 'Portal.azure.com search service key',
      format: String,
      default: null,
      env: 'AZURE_SEARCH_KEY'
    }
  }
})

export { convictConfig }
