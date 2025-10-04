// chuyen doi ham o bai tap 1 sang TypeScript
export function getEnvironmentFileName(env: string): string {
    switch (env) {
      case 'dev':
        return 'dev.json';
      case 'staging':
        return 'staging.json';
      case 'production':
        return 'production.json';
      default:
        throw new Error(`Unknown environment: ${env}`);
    }
  }
  
  console.log(getEnvironmentFileName('staging')); // staging.json
  