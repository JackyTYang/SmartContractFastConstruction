// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


/*更新合约地址*/
interface Facade{
    function update (address oldAddr, address newAddr) external;
}

contract A is Facade{
    mapping (string => address) s2addr;
    mapping (address => string) addr2s;
    function update (address oldAddr, address newAddr) public{
        string memory tempS = addr2s[oldAddr];
        s2addr[tempS] = newAddr;
        addr2s[newAddr] = tempS;
        delete addr2s[oldAddr];
    }
}

contract Observer{
    address [] subscriber;
    function subscribe (address facadeAddr) public{
        subscriber.push(facadeAddr);
    }

    function notify(address oldAddr, address newAddr) public{
        for(uint i = 0; i < subscriber.length; i++){
            Facade(subscriber[i]).update(oldAddr, newAddr);
        }
    }
}