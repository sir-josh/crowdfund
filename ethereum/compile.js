const path = require('path');
const solc = require('solc');
const  fs = require('fs-extra');    //fs = file system

const buildPath = path.resolve(__dirname, 'build'); //get the build directory

// if(buildPath){                          //Check to see if the build directory already exist
//     fs.removeSync(buildPath);           //Then remove the build directory
// }

fs.removeSync(buildPath);

const crowdfundPath = path.resolve(__dirname, 'contracts', 'Crowdfund.sol');   //Get the crowdfund solidity contract file path
const sourceCode = fs.readFileSync(crowdfundPath, 'utf8');       //read the source code for crowdfund solidity file
const output = solc.compile(sourceCode, 1).contracts;             //compile the source code to the 'output' variable

fs.ensureDirSync(buildPath);         //ensure that there is build directory, if not create it.


for (let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract.replace(':', '')}.json`),
        output[contract]
    );
}