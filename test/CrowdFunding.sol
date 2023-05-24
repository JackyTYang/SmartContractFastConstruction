// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

// 工厂合约，用于创建新的众筹项目合约
contract CrowdfundingFactory {
    address[] public crowdfundingProjects;

    // 创建新的众筹项目合约
    function createCrowdfundingProject(uint256 _targetAmount, uint256 _duration) external {
        CrowdfundingProject newProject = new CrowdfundingProject(_targetAmount, _duration, msg.sender);
        crowdfundingProjects.push(address(newProject));
    }

    // 获取所有已创建的众筹项目合约地址
    function getCrowdfundingProjects() external view returns (address[] memory) {
        return crowdfundingProjects;
    }
}

// 众筹项目合约
contract CrowdfundingProject {
    enum State { Funding, Failed, Successful }

    State public currentState;
    uint256 public targetAmount;
    uint256 public deadline;
    uint256 public totalAmount;
    mapping(address => uint256) public contributions;

    Oracle public oracle;

    event StateTransition(State from, State to);
    event FundingReceived(address backer, uint256 amount);

    constructor(uint256 _targetAmount, uint256 _duration, address _oracleAddress) {
        targetAmount = _targetAmount;
        deadline = block.timestamp + _duration;
        currentState = State.Funding;
        oracle = Oracle(_oracleAddress);
    }

    function contribute() external payable {
        require(currentState == State.Funding, "Crowdfunding is not active");
        require(block.timestamp < deadline, "Crowdfunding deadline has passed");

        contributions[msg.sender] += msg.value;
        totalAmount += msg.value;
        emit FundingReceived(msg.sender, msg.value);

        if (totalAmount >= targetAmount) {
            transitionTo(State.Successful);
        }
    }

    function claimFunds() external {
        require(currentState == State.Successful, "Crowdfunding is not successful");
        require(contributions[msg.sender] > 0, "No contribution found");

        uint256 amountToClaim = contributions[msg.sender];
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amountToClaim);
    }

    function refund() external {
        require(currentState == State.Failed, "Crowdfunding was successful");
        require(contributions[msg.sender] > 0, "No contribution found");

        uint256 amountToRefund = contributions[msg.sender];
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amountToRefund);
    }

    function transitionTo(State _state) internal {
        currentState = _state;
        emit StateTransition(currentState, _state);

        if (_state == State.Successful) {
            // Call the Oracle to perform some action or retrieve data
            uint256 externalData = oracle.getData();
            // Process the external data or take necessary actions
            // ...
        }
    }
}

// 预言机合约，用于获取外部数据
contract Oracle {
    function getData() external view returns (uint256) {
        // In this example, the Oracle returns a random number between 1 and 100
        // You can modify this function to retrieve real-world data from an external source
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100 + 1;
    }
}