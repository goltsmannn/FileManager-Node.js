import path from 'path';
import os from "node:os";
import config from './config.js';
import fs from 'fs/promises'

export async function up(){
    if(path.parse(config.currentDirectory).root !== config.currentDirectory){
        config.currentDirectory = path.dirname(config.currentDirectory)
    }

}

export async function cd(input){
    const [_, target] = input.split(' ');
    if (target === undefined){
        console.error('Invalid input');
        return;
    }


    const newPath = path.join(config.currentDirectory, target);
    try{
        await fs.access(newPath);
        config.currentDirectory = newPath;
    } catch {
        console.error('Directory doesn\'t exist');
    }
}

export async function ls(){
    try {
        const filesList = await fs.readdir(config.currentDirectory);
        const table = await Promise.all(
            filesList.map(async (file) => {
                const stats = await fs.stat(path.join(config.currentDirectory, file));
                return {
                    Name: file,
                    Type: stats.isFile() ? 'File' : 'Directory',
                }
            })
        )
            .then((table) => console.table(table))
    } catch (error) {
        console.error('Error while listing directories');
    }
}

