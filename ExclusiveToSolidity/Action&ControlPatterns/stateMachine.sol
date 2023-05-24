// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract DepositLock {
//     enum Stages {
//         AcceptingDeposits,
//         FreezingDeposits,
//         ReleasingDeposits
//     }
    
//     Stages public stage = Stages.AcceptingDeposits;
//     uint public creationTime = block.timestamp;
//     mapping (address => uint) balances;

//     modifier atStage(Stages _stage) {
//         require(stage == _stage, "Invalid stage");
//         _;
//     }

//     modifier timedTransitions() {
//         if (stage == Stages.AcceptingDeposits && block.timestamp >= creationTime + 1 days) {
//             nextStage();
//         }
//         if (stage == Stages.FreezingDeposits && block.timestamp >= creationTime + 8 days) {
//             nextStage();
//         }
//         _;
//     }

//     function nextStage() internal {
//         stage = Stages(uint(stage) + 1);
//     }

//     function deposit() public payable timedTransitions atStage(Stages.AcceptingDeposits) {
//         balances[msg.sender] += msg.value;
//     }

//     function withdraw() public timedTransitions atStage(Stages.ReleasingDeposits) {
//         uint amount = balances[msg.sender];
//         balances[msg.sender] = 0;
//         (bool success, ) = msg.sender.call{value: amount}("");
//         require(success, "Failed to send ether");
//     }
// }

contract stateMachine {
    enum Stages {
        stage1,
        stage2,
        stage3
    }
    
    Stages public stage = Stages.stage1;

    modifier atStage(Stages _stage) {
        require(stage == _stage, "Invalid stage");
        _;
    }

    modifier stageChange() {
        if (stage == Stages.stage1 && true) {//附加条件
            nextStage();
        }
        if (stage == Stages.stage2 && true) {
            nextStage();
        }
        _;
    }

    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }

    function A() public payable stageChange atStage(Stages.stage1) {
        //函数逻辑
    }

}