// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract contract1{
    function A() public pure returns (uint){
        return 5;
    }
}

contract UseSatellite{
    address satelliteAddress;

    contract1 c = contract1(satelliteAddress);

    function updateSatelliteAddress(address _address) public{
        satelliteAddress = _address;
    }
}

/*----------------------------------------------------------修改版,增加一个外观中介，直接修改外观即可。*/
