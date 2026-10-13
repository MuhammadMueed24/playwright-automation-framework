import 'dotenv/config';

export const API_BASE_URL =
  process.env.API_BASE_URL || process.env.BASE_URL || 'https://www.automationexercise.com';

export const API_TIMEOUT = Number(process.env.API_TIMEOUT || 15_000);
