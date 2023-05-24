// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Oracle {
    address knownSource; // known source
    
    struct Request {
        bytes data;
        function(bytes memory) external callback;
    }
    
    Request[] requests;
    
    event NewRequest(uint);//用于js监听
    
    modifier onlyBy(address account) {
        require(msg.sender == account, "Unauthorized access"); 
        _;
    }
    
    constructor(address _knownSource) {
        knownSource = _knownSource;
    }
    
    function askForOutsideData(bytes memory data, function(bytes memory) external callback) public {
        requests.push(Request(data, callback));
        emit NewRequest(requests.length - 1);//触发事件
    }
    
    function reply(uint requestID, bytes memory response) public onlyBy(knownSource) {//被外部js调用
        requests[requestID].callback(response);
    }
}


contract OracleConsumer {
    Oracle immutable oracle; // known contract
    
    constructor(address _oracle) {
        oracle = Oracle(_oracle);
    }
    
    modifier onlyBy(address account) {
        require(msg.sender == account, "Unauthorized access"); 
        _;
    }
    
    function updateExchangeRate() public {
        oracle.askForOutsideData("DATA", this.oracleResponse);
    }
    
    function oracleResponse(bytes memory response) public onlyBy(address(oracle)) {
        // 回调函数，如何处理得到的外部数据
    }
}