const requiredVars = [
  'DATABASE_URL',
  'NODE_ENV',
];

const optionalVars = {
  PORT: 3000,
  LOG_LEVEL: 'info',
  CORS_ORIGIN: '*',
};

function loadConfig() {
  const config = {};
  
  // Validate required variables
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
    config[varName] = process.env[varName];
  }
  
  // Load optional variables with defaults
  for (const [varName, defaultValue] of Object.entries(optionalVars)) {
    config[varName] = process.env[varName] || defaultValue;
  }
  
  // Parse numeric values
  config.PORT = parseInt(config.PORT, 10);
  
  // Validate values
  if (isNaN(config.PORT) || config.PORT < 1 || config.PORT > 65535) {
    throw new Error('Invalid PORT value');
  }
  
  if (!['development', 'staging', 'production'].includes(config.NODE_ENV)) {
    throw new Error(`Invalid NODE_ENV: ${config.NODE_ENV}`);
  }
  
  return Object.freeze(config);
}

const config = loadConfig();

// Log configuration (without secrets)
console.log('Configuration loaded:', {
  NODE_ENV: config.NODE_ENV,
  PORT: config.PORT,
  LOG_LEVEL: config.LOG_LEVEL,
  CORS_ORIGIN: config.CORS_ORIGIN,
});

module.exports = config;
