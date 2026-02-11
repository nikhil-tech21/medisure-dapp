// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MediSure {

    struct Medicine {
        string name;
        string manufacturer;
        uint256 batchNumber;
        bool isAuthentic;
    }

    mapping(uint256 => Medicine) public medicines;

    function registerMedicine(
        uint256 _batchNumber,
        string memory _name,
        string memory _manufacturer
    ) public {
        medicines[_batchNumber] = Medicine(
            _name,
            _manufacturer,
            _batchNumber,
            true
        );
    }

    function verifyMedicine(uint256 _batchNumber)
        public
        view
        returns (bool)
    {
        return medicines[_batchNumber].isAuthentic;
    }
}