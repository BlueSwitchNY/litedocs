require("dotenv").config()
const dotenv = require("dotenv-webpack")

module.exports = {
  serverRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
    MAGIC_PUBLIC_KEY: process.env.MAGIC_PUBLIC_KEY,
    MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
    MAGIC_PUBLIC_KEY_LIVE: process.env.MAGIC_PUBLIC_KEY_LIVE,
    MAGIC_SECRET_KEY_LIVE: process.env.MAGIC_SECRET_KEY_LIVE,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  env: {
    nodeEnv: process.env.NODE_ENV,
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(new dotenv({ silent: true }))

  //   return config
  // },
}
