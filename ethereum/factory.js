import web3 from './web3';
import crowdfundFactory from './build/CrowdFundFactory.json';

const CrowdFundFactoryInstance = new web3.eth.Contract(
    JSON.parse(crowdfundFactory.interface), 
    "0x7263CC0f4502376Fb08A31587338924BEb417B10"
);

export default CrowdFundFactoryInstance;