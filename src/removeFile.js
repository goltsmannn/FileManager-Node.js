import fs from 'fs/promises';
import config from './config.js'
import path from "path";

export default async function rm(input) {
    let [_, filePath] = input.split(' ');
    filePath = path.join(config.currentDirectory, filePath);
    fs.access(filePath)
        .then((data) => fs.rm(filePath))
        .catch((err) => console.error('File doesn\'t exist'));
}
