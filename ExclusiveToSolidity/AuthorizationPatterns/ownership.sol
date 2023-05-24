// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Owned {//直接生成代码块
    address public owner;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized access");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    //之后需要权限的函数加上modifier即可
}
