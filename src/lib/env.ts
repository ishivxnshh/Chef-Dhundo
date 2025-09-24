export const env = {
  //NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsuY2hlZmRodW5kby5jb20k',
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};

// Validate required environment variables
export function validateEnv() {
  const required = ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'];
  
  for (const key of required) {
    if (!process.env[key]) {
      console.warn(`Missing required environment variable: ${key}`);
    }
  }
}

// Call validation in development
if (process.env.NODE_ENV === 'development') {
  validateEnv();
}
