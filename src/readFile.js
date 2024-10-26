import fs from 'fs';
import path from 'path';
import config from './config.js';


export default function cat(input){
    const [_, filePath] = input.split(" ");
    const stream = fs.createReadStream(path.join(config.currentDirectory, filePath))
        .on('error', (err) => console.error('Error while reading file content'));
    stream.pipe(process.stdout);
}