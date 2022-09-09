declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD: string
      MONGODB: string
      GUILDS: string
      LOGIN: string
      ERROR: string
    }
  }
}

export {}
