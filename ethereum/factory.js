import web3 from './web3';
import crowdfundFactory from './build/CrowdFundFactory.json';

//Old Deployed Instance 1
// const CrowdFundFactoryInstance = new web3.eth.Contract(
//     JSON.parse(crowdfundFactory.interface), 
//     "0x7263CC0f4502376Fb08A31587338924BEb417B10"
// );

const CrowdFundFactoryInstance = new web3.eth.Contract(
    JSON.parse(crowdfundFactory.interface), 
    "0x692eC7250cd90dD09b03f052BA82B4fb6967b15c"
);

export default CrowdFundFactoryInstance;