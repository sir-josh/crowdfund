pragma solidity ^0.4.17; 

contract CrowdFundFactory{
    address[] public deployedCrowdFundInstances;
    
    function deployNewCrowdFund(uint minimumContribution, string projectName, string projectDesc, string managerName) public {
        address newProject = new CrowdFund(minimumContribution, msg.sender, projectName, projectDesc, managerName);
        deployedCrowdFundInstances.push(newProject);
    }
    
    function getAllDeployedCrownfund() public view returns (address[]){
        return deployedCrowdFundInstances;
    }
}




contract CrowdFund {
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint contributorsApprovalCount;
        mapping(address => bool) contributorsApproval;
    }
    
    Request[] public managerRequests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributors;
    uint public totalContributorsCount;
    string projectName;
    string projectDescription;
    string owner;
    
    modifier restrictedAccess(){
        require(msg.sender == manager);
        
        _;
    }
    
    function CrowdFund(uint minimumAmount, address creator, string description, string name, string managerName) public {
        manager = creator;
        minimumContribution = minimumAmount;
        projectDescription = description;
        projectName = name;
        owner = managerName;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        
        contributors[msg.sender] = true;
        totalContributorsCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restrictedAccess {
        Request memory createNewRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            contributorsApprovalCount: 0
        });
        
        managerRequests.push(createNewRequest);
    }
    
    function approveRequestByContributor(uint index) public {
        Request storage request =  managerRequests[index];
        
        require(contributors[msg.sender]);  //Checks to see if the person is a donator/contributor to the project
        require(!managerRequests[index].contributorsApproval[msg.sender]);   //check to to see if the person have not approved the manager's request before
        
        // managerRequests[index].contributorsApproval[msg.sender] = true;   //Add the person to the list people that has approved this particular manager's request
        // managerRequests[index].contributorsApprovalCount++;              //Increase the yes count(for approved request) by one
        
        request.contributorsApproval[msg.sender] = true;
        request.contributorsApprovalCount++; 
    }
    
    function finalizeRequestByManager(uint index) public restrictedAccess {
        Request storage specificRequest = managerRequests[index];
        
        require(specificRequest.contributorsApprovalCount > (totalContributorsCount/2));  //Checks to see if the contributors aprroval vote is more than half(enought voters)
        require(!specificRequest.complete);  //Checks to see if the request have not beeen finalized before by the manager(creator of the project)
        
        specificRequest.recipient.transfer(specificRequest.value);   // Sends the money(value) to recipient's address for that particular request
        
        specificRequest.complete = true;  //Sets the request completion to be true
    }
}