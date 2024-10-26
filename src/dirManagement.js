import path from 'path';
import os from "node:os";
import config from './config.js';
import fs from 'fs/promises'

export function up(){
    config.currentDirectory = path.dirname(config.currentDirectory)
}


export async function ls(){
    const filesList = await fs.readdir(config.currentDirectory);
    const table = await Promise.all(
        filesList.map(async (file) => {
            const stats = await fs.stat(path.join(config.currentDirectory, file));
            return {
                Name: file,
                Type: stats.isFile()? 'File' : 'Directory',
            }
        })
    )
        .then((table)=> console.table(table))
}

