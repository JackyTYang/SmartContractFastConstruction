// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Service{
    function setupContract(string memory arg1, string memory arg2, string memory arg3) external;
}

contract A is Service{
    string arg1;
    string arg2;
    string arg3;

    /*实现的方法*/
    function setupContract(string memory _arg1, string memory _arg2, string memory _arg3) external override {
        arg1 = _arg1;
        arg2 = _arg2;
        arg3 = _arg3;
    }

    /*其他函数*/

}

contract B is Service{
    string arg1;
    string arg2;
    string arg3;

    /*实现的方法*/
    function setupContract(string memory _arg1, string memory _arg2, string memory _arg3) external override {
        arg1 = _arg1;
        arg2 = _arg2;
        arg3 = _arg3;
    }

    /*其他函数*/

}

contract composer{
    A _A;
    B _B;
    bool confirmed;

    /*设置该函数*/
    function setA(string memory _arg1, string memory _arg2, string memory _arg3) external{
        if(!confirmed){
            _A = new A();
            _A.setupContract(_arg1, _arg2, _arg3);
        }
    }
    function setB(string memory _arg1, string memory _arg2, string memory _arg3) external{
        if(!confirmed){
            _B = new B();
            _B.setupContract(_arg1, _arg2, _arg3);
        }
    }

    /*额外权限*/
    function confirm() public{
        confirmed = true;
    }
}