const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CrowdFundFactory.json');
const compiledCrowdfund = require('../ethereum/build/CrowdFund.json');

let accounts, factoryInstance, crowdfund, crowdfundAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factoryInstance = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                            .deploy({ data: compiledFactory.bytecode })
                            .send({ from: accounts[0], gas: '1000000' });
});