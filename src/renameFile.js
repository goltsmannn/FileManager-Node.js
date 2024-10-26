import fs from 'fs'
import config from "./config.js";
import path from "path";

export default function rn (input){
    let [_, oldName, newName] = input.split(" ");
    oldName = path.join(config.currentDirectory, oldName);
    newName = path.join(config.currentDirectory, newName);

    if(!fs.existsSync(oldName)) {
        throw new Error("Initial file doesn't exist");
    } else if (fs.existsSync(newName)) {
        throw new Error("Target file name already exists");
    }
    fs.renameSync(oldName, newName);
};

