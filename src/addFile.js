import fs from 'fs/promises';
import config from './config.js'
import path from "path";

export default async function add(input){
    let [_, filePath] = input.split(' ');
    filePath = path.join(config.currentDirectory, filePath);
    fs.access(filePath)
        .then((stats) => console.error('File already exists'))
        .catch(async (err) => {
            await fs.writeFile(filePath, '', (err) => {console.error(err);});
        });
}
