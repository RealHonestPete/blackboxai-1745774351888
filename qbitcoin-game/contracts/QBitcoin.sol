// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QBitcoin is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 21_000_000_000_000_000_000_000_000 * (10 ** 18);

    constructor() ERC20("QBitcoin", "QBTC") {
        // Ownable constructor is called automatically in recent OpenZeppelin versions
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }
}
