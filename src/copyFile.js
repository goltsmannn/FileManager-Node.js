import fs from 'fs';
import path from 'path';
import config from './config.js';


export default function cp(input){
    let [_, oldPath, newPath] = input.split(' ');
    oldPath = path.join(config.currentDirectory, oldPath);
    newPath = path.join(config.currentDirectory, newPath);
}