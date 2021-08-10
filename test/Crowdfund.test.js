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


describe('CrowdFund Contract Project', () => {
    //Test for successfull deployment of contracts
    it('deploys a factory and a crowdfund', ()=> {
        assert.ok(factoryInstance.options.address);
        assert.ok(crowdfund.options.address);
    });

    //Test whether a person(address) that calls deployNewCrowdFund()-function from crowdfundFactory contract class to
    //deploy a crowdfund instance is the manager/address/owner of that crowdfund
    it('verifies the manager of a crowdfund', async () => {
        const manager = await crowdfund.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    //Test whether a person can contribute and mark as a contributor
    it('allows a person to contribute and marked as a contributor', async () => {
        await crowdfund.methods.contribute().send({
            value: "200",
            from: accounts[1]
        });

        const isContributor = await crowdfund.methods.contributors(accounts[1]).call();
        assert(isContributor);
    });

    //Test for minimum requirement on a contribution to crowdfund
    it('requires a minimum contribution', async () => {
        try {
            await crowdfund.methods.contribute().send({
                value: "55",                   //contribution amount less than minimum requirement, therefore an error occurs
                from: accounts[2]
            });
        } catch (error) {
            assert(error);                     //if it fails (i.e catches an error), the test passes
            return;                            //exit test 
        }

        assert(false);                         // code didn't fail, so test fails
    });


    //Test whether the manager can make a request for payment
    it('allows a manager to make payment request', async () => {
        await crowdfund.methods.createRequest("For raw materials", "100", accounts[5]).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request = await crowdfund.methods.managerRequests(0).call();
        assert.equal('For raw materials', request.description);
    });
});