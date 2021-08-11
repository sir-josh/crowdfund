import web3 from './web3';
import crowdfundFactory from './build/CrowdFundFactory.json';

const CrowdFundFactoryInstance = new web3.eth.Contract(
    JSON.parse(crowdfundFactory.interface), 
    "0xab6DE12c4a8621596cc3b9D83c8b8f125e2eC483"
);

export default CrowdFundFactoryInstance;