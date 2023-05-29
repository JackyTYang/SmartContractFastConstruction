// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract contract1{
    function A() public pure returns (uint){
        return 5;
    }
}

contract UseSatellite{
    contract1 myContract1;

    constructor(contract1 _contract1){
        myContract1 = _contract1;
    }

    function updateSatelliteAddress(contract1 __contract1) public{
        myContract1 = __contract1;
    }
}

/*----------------------------------------------------------修改版,增加一个外观中介，直接修改外观即可。*/
