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
  aws: {
    S3_BUCKET_REGION: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    S3_BUCKET: string;
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
  aws: {
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    S3_BUCKET: process.env.S3_BUCKET
  },
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