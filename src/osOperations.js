import os from "os";

export default async function osFunc(input){
    const [_, op] = input.split(' ');
    switch(op.replace('--', '')){
        case "EOL":
            process.stdout.write(`System EOL: ${os.EOL}`)
            break;
        case "cpus":
            const cpus = os.cpus();
            process.stdout.write(`Amount of CPU: ${cpus.length}`);

            cpus.forEach((cpu, index) => {
                process.stdout.write(`Info for CPU number ${index}:\n`);
                process.stdout.write(`CPU: ${cpu.model}\n`);
                process.stdout.write(`Clock rate: ${cpu.speed}\n`);
            })
            break;

        case "homedir":
            process.stdout.write(`Homedir: ${os.homedir()}\n`);
            break;

        case "username":
            process.stdout.write(`Username: ${os.username()}\n`);
            break;

        case "architecture":
            process.stdout.write(`Architecture: ${os.arch()}\n`);
            break;

        default:
            process.stdout.write(`Unsupported argument\n`);
    }
}