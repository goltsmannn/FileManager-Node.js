import validateParameters from "./welcome.js";
import config from "./config.js";
import {up, ls} from "./dirManagement.js";
import cat from './readFile.js'
import rn from './renameFile.js'
import cp from "./copyFile.js";


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
    }
}