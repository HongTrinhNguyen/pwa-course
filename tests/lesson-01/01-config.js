// Bài tập: Viết một hàm để lấy tên file cấu hình dựa trên môi trường (environment).
function getEnvironmentFileName(env) {
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

  console.log(getEnvironmentFileName('dev')); // dev.json
  console.log(getEnvironmentFileName('production')); // production.json
  