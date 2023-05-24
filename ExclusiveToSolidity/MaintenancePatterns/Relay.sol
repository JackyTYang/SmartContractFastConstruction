// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AuthorizationPatterns/ownership.sol";

contract Relay is Owned {
    address public currentVersion;

    constructor(address initAddr) {
        currentVersion = initAddr;
        owner = msg.sender;
    }

    function changeContract(address newVersion) public onlyOwner {
        currentVersion = newVersion;
    }

    // fallback function
    fallback() external {
        require(currentVersion.delegatecall(msg.data));
    }
}