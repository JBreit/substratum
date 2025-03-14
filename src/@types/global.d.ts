// const SUPPORTED_LANGUAGES = ['en'];

// export type Language = typeof SUPPORTED_LANGUAGES[number];

declare namespace NodeJS {
  export interface ProcessEnv {
    APP_NAME: string;
    APP_VERSION: string;
    BACKLOG: number;
    BASE_URL: string;
    BROWSERSLIST: string;
    BROWSERSLIST_CONFIG: string;
    BROWSERSLIST_DISABLE_CACHE: string;
    BROWSERSLIST_ENV: string;
    BROWSERSLIST_ROOT_PATH: string;
    BROWSERSLIST_STATS: string;
    CSRF_NAME: string;
    CSRF_SECRET: string;
    ESLINT_USE_FLAT_CONFIG: string;
    HOST: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    LOG_FORMAT: string;
    LOG_MAX_FILES: number;
    LOG_MAX_SIZE: number;
    MONGODB_NAME: string;
    MONGODB_HOST: string;
    MONGODB_PORT: number;
    MONGODB_URI: string;
    MONGODB_USERNAME: string;
    MONGODB_PASSWORD: string;
    NODE_ENV: 'development' | 'production' | 'test';
    NODE_OPTIONS: string;
    PORT: string;
    PROTOCOL: string; // eventually switch to 'http' | 'https'
    REQUEST_LIMIT?: string;
    SESSION_NAME: string;
    SESSION_SECRET: string;
    SSL_CERT_DIR: string;
    SSL_CERT_FILE: string;
    SSL_CERT_KEY: string;
    TZ: string;
  }
}
