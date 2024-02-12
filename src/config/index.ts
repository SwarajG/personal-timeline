type config = {
  port: number;
  env: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  },
  auth: {
    google: {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

const config: config = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
  },
  auth: {
    google: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || ''
    }
  }
}

export default config;