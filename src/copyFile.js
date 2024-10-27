import fs from 'fs/promises';
import path from 'path';
import config from './config.js';
import {createReadStream, createWriteStream, rm} from 'fs';

export async function cp(input){
    let [_, oldPath, newPath] = input.split(' ');
    const target = path.join(config.currentDirectory, newPath, oldPath);
    newPath = path.join(config.currentDirectory, newPath);
    oldPath = path.join(config.currentDirectory, oldPath);
    try{
        await fs.access(oldPath);
        await fs.access(newPath);
        const fileFrom = createReadStream(oldPath);
        const fileTo = createWriteStream(target);
        fileFrom.pipe(fileTo);
    }
    catch (e) {
        console.error('Source or target directory doesn\'t exist)');
    }
}

export async function mv(input) {
    let [_, oldPath, newPath] = input.split(' ');
    await cp(input);
    oldPath = path.join(config.currentDirectory, oldPath);
    await rm(oldPath, (err, data) => {if(err) { console.error(err);}});
}
