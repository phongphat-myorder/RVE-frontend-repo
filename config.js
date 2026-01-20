require('dotenv').config({ path: './.env' });

const REQUIRED_ENV = ['NG_APP_API_URL', 'MY_ENV'];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`[ENV] Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}
