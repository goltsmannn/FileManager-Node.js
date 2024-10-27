import path from "path";
import fs from "fs/promises";
import config from "./config.js";
import {createReadStream} from "fs";
import crypto from "crypto";

export default async function hash (input)  {
    let [_, fileName] = input.split(' ');
    fileName = path.join(config.currentDirectory, fileName);
    fs.access(fileName, fs.constants.R_OK)
        .then((stats) => {
            let data = "";
            const readStream = createReadStream(fileName)
                .on('data', (chunk) => {data += chunk.toString().trim()})
                .on('end', ()=>{
                    const response = crypto.createHash('SHA-256').update(data).digest('hex');
                    process.stdout.write(response.toString() + '\n');
                });
        })
        .catch((err) => {console.error('Operation failed');});

};
