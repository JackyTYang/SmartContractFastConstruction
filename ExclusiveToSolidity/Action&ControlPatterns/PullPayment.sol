// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {//原始版本
    address payable public highestBidder;
    uint256 public highestBid;

    function bid() public payable {
        require(msg.value >= highestBid);
        if (highestBidder != address(0)) {
            // if call fails causing a rollback,
            // no one else can bid
            highestBidder.transfer(highestBid);
        }
        highestBidder = payable(msg.sender);
        highestBid = msg.value;
    }
}


/*更新后的版本*/
contract Auction2 {
    address payable public highestBidder;
    uint256 public highestBid;
    mapping(address => uint256) refunds;

    function bid() public payable {
        require(msg.value >= highestBid, "The bid value should be greater than or equal to the highest bid.");
        if (highestBidder != address(0)) {
            refunds[highestBidder] += highestBid;
        }
        highestBidder = payable(msg.sender);
        highestBid = msg.value;
    }

    function withdrawRefund() public {
        uint256 refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        payable(msg.sender).transfer(refund);
    }
}

//在第二个版本中，可重入攻击被避免，因为所有的状态变量（例如highestBidder和highestBid）都在更新前进行了修改，而不是在更新后。

//在旧的版本中，当合约向上述最高出价者支付余额时，这可能会导致一个问题：如果最高出价者的智能合约（如果它有一个）执行一个回调函数来调用bid()函数，
//那么在更新highestBidder和highestBid之前，该函数可以再次调用bid()。这将导致highestBid被多次递增，最后导致最高出价者比实际要多支付一些以获胜。这就是可重入攻击的一种形式。

//在新版本中，所有状态变量都在调用bid()之前进行了修改，这意味着如果最高出价者的智能合约调用了bid()，
//它不会更改任何状态变量，因为highestBid和highestBidder都已经更新。因此，攻击者无法在更新后重新调用bid()。