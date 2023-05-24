// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../AuthorizationPatterns/ownership.sol";

contract Register is Owned {
    address private backendContract;
    address[] private previousBackends;

    function changeBackend(address newBackend) public onlyOwner returns (bool) {
        if (newBackend != backendContract) {
            previousBackends.push(backendContract);
            backendContract = newBackend;
            return true;
        }
        return false;
    }
    
    function getBackend() public view returns (address) {
        return backendContract;
    }

    function getPreviousBackends() public view returns (address[] memory) {
        return previousBackends;
    }
}