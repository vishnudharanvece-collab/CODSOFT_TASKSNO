// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {

    uint256 public storedNumber;

    event NumberUpdated(uint256 newNumber);

    function store(uint256 _number) public {
        storedNumber = _number;
        emit NumberUpdated(storedNumber);
    }

    function retrieve() public view returns (uint256) {
        return storedNumber;
    }

    function increment() public {
        storedNumber++;
        emit NumberUpdated(storedNumber);
    }

    function decrement() public {
        require(storedNumber > 0, "Number cannot be negative");
        storedNumber--;
        emit NumberUpdated(storedNumber);
    }
}