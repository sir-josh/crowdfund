const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CrowdFundFactory.json');
const compiledCrowdfund = require('../ethereum/build/CrowdFund.json');

let accounts, factoryInstance, crowdfund, crowdfundAddress;

beforeEach(async () => {
    //Get a web3 accounts from the provider inside of web3
    accounts = await web3.eth.getAccounts();

    //Deploys a new crowdfund-factory instance to the network
    factoryInstance = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                            .deploy({ data: compiledFactory.bytecode })
                            .send({ from: accounts[0], gas: '1000000' });

    //Calls a method- [deployNewCrowdFund(minimum-contribution) ===> contract receipt]- inside the factory instance to deploy a 
    //new instance of crowdfund contract to the network
    await factoryInstance.methods.deployNewCrowdFund('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    //Call a function inside the factoryInstance-[getAllDeployedCrowdfund() ===> array of addresses]- to retrieve an array all 
    //the address(es) where the crowfund instance(s) where deployed to
    //  :
    //  :
    //Since it's only one crowdfund instance was deployed to the network, assign the first address in the array to crowfundAddress
    // variable
    [crowdfundAddress] = await factoryInstance.methods.getAllDeployedCrownfund().call();


    //Get the crowdfund instance that was deploy to (crowfundAddress) location on the network
    crowdfund = await new web3.eth.Contract(
        JSON.parse(compiledCrowdfund.interface), 
        crowdfundAddress
    );
});