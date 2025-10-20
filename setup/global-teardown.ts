import fs from 'fs';

export default async () => {
    if (fs.existsSync('.playwright/auth.json')){
        fs.unlinkSync('.playwright/auth.json');
    }
};