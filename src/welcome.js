import config from './config.js'

function validateParameters(){
    const [paramName, paramValue] = process.argv.slice(2)[0].split('=');
    console.log(paramValue);
    if (paramName.replace('--', '') === 'username'){
        process.stdout.write(`Welcome to the File Manager, ${paramValue}!\n`);
        process.stdout.write(`You are currently in directory: ${config.currentDirectory}\n`);
        config.username = paramValue;
    }
    else{
        process.stdout.write(`Wrong parameters, bye!\n`);
        process.exit();
    }
}

export default validateParameters;