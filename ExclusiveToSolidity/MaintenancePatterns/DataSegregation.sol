// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStorage {
    mapping(bytes32 => uint256) private uintStorage;
    mapping(bytes32 => string) private stringStorage;

    /*自动生成GetterandSetter*/

    function getUintValue(bytes32 key) public view returns (uint256) {
        return uintStorage[key];
    }

    function setUintValue(bytes32 key, uint256 value) public {
        uintStorage[key] = value;
    }
}

contract Logic {
    DataStorage private dataStorage;

    constructor(DataStorage _dataStorage) {
        dataStorage = _dataStorage;
    }

    function f() public {
        bytes32 key = keccak256(abi.encodePacked("emergency"));
        dataStorage.setUintValue(key, 911);
        dataStorage.getUintValue(key);
    }
}