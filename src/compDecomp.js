import stream from "node:stream";
import fs from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import zlib from "zlib";
import path from "path";
import config from "./config.js";


export default async function compressDecompress(input, flag) {
    let [_, pathToFile, pathToDestination] = input.split(" ");

    pathToDestination = pathToDestination === '.'? "": pathToDestination;

    try{
        await fs.access(path.join(config.currentDirectory, pathToFile), fs.constants.R_OK);
        await fs.access(path.join(config.currentDirectory, pathToDestination), fs.constants.F_OK);
    }
    catch {
        console.error('Error compressing file');
    }


    let targetPath, transformStream;
    if(flag === 'compress'){
        targetPath = path.join(config.currentDirectory, pathToDestination, pathToFile.split(".")[0]+'.gz');
        transformStream = new stream.Transform({
            transform(data, encoding, callback) {
                zlib.brotliCompress(data, (err, compressedData) =>{
                    this.push(compressedData);
                    callback();
                })
            }})

    } else if(flag === 'decompress'){
        targetPath = path.join(config.currentDirectory, pathToDestination, pathToFile.split(".")[0]+'.txt');
        console.log(targetPath);
        transformStream = new stream.Transform({
            transform(data, encoding, callback) {
                zlib.brotliDecompress(data, (err, decompressedData) =>{
                    this.push(decompressedData);
                    callback();
                })
            }})
    }

    const readStream = createReadStream(path.join(config.currentDirectory, pathToFile));
    const writeStream = createWriteStream(targetPath);
    readStream.pipe(transformStream).pipe(writeStream);
};


