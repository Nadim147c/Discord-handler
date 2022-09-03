declare global {
    namespace Node {
        interface ProcessEnv {
            DISCORD: string
            MONGODB: string
        }
    }
}

export {}
