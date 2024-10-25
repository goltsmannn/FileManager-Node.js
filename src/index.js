import validateParameters from "./welcome.js";
import config from "./config.js";
import {up, ls} from "./dirManagement.js";


validateParameters();
process.stdin
    .on('data', (data) => {processUserInput(data.toString().trim())})


function processUserInput(data) {
    switch (data) {
        case ".exit":
            process.stdout.write(`Thank you for using File Manager, ${config.username}, goodbye!\n`);
            process.exit();
            break;

        case "up":
            up()
            break;

        case "ls":
            ls()
            break;

    }
}