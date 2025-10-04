// chuyen doi ham o bai tap 1 sang TypeScript
function getEnvironmentFileName(env) {
    switch (env) {
        case 'dev':
            return 'dev.json';
        case 'staging':
            return 'staging.json';
        case 'production':
            return 'production.json';
        default:
            throw new Error("Unknown environment: ".concat(env));
    }
}
console.log(getEnvironmentFileName('staging')); // staging.json
