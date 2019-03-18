import {existsSync, readFileSync} from 'fs';

export default (filePath: string): [] => {
    if (!existsSync(filePath)) {
        return [];
    } else {
        let raw = readFileSync(filePath);
        return JSON.parse(raw.toString('utf8'));
    }
};
