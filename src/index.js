import validateParameters from "./welcome.js";
import config from "./config.js";
import {up, ls} from "./dirManagement.js";
import cat from './readFile.js'
import rn from './renameFile.js'
import {cp, mv} from "./copyFile.js";
import compressDecompress from "./compDecomp.js";
import add from "./addFile.js";
import rm from "./removeFile.js";
import hash from "./hashFile.js";
import os from "./osOperations.js";
import osFunc from "./osOperations.js";

validateParameters();
process.stdin
    .on('data', (data) => {processUserInput(data.toString().trim())})


async function processUserInput(data) {
    const cmd = data.split(' ')[0]
    switch (cmd) {
        case ".exit":
            process.stdout.write(`Thank you for using File Manager, ${config.username}, goodbye!\n`);
            process.exit();
            break;

        case "up":
            up()
            break;

        case "ls":
            await ls()
            break;

        case "cat":
            await cat(data);
            break;

        case "rn":
            await rn(data);
            break;

        case "cp":
            await cp(data);
            break;

        case "mv":
            await mv(data);
            break;

        case "compress":
            await compressDecompress(data, 'compress');
            break;

        case "decompress":
            await compressDecompress(data, 'decompress');
            break;

        case "add":
            await add(data);
            break;

        case "rm":
            await rm(data);
            break;

        case "hash":
            await hash(data);
            break;

        case "os":
            await osFunc(data);
            break;

        default:
            process.stdout.write(`Unsupported operation\n`);
    }
}