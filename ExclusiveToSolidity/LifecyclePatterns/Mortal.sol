// SPDX-License-Identifier: MIT
import "../AuthorizationPatterns/ownership.sol";
pragma solidity ^0.8.0;

contract Mortal is Owned {
    function destroy() external onlyOwner {
        selfdestruct(payable(owner));
    }
    
    function destroyAndSend(address payable recipient) public onlyOwner {
        selfdestruct(recipient);
    }
}