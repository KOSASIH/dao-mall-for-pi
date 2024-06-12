pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./AdvancedNFT.sol";

contract AuctionHouse {
    using SafeERC721 for AdvancedNFT;
    using SafeMath for uint256;

    struct Auction {
        uint256 id;
        address seller;
        uint256 tokenId;
        uint256 startingPrice;
        uint256 endingPrice;
        uint256 duration;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    AdvancedNFT public nftContract;
    mapping (uint256 => Auction) public auctions;
    uint256 public auctionCount;

    event AuctionCreated(uint256 id, address seller, uint256 tokenId, uint256 startingPrice, uint256 endingPrice, uint256 duration);
    event AuctionEnded(uint256 id, address winner, uint256 amount);
    event AuctionCancelled(uint256 id);

    constructor(address _nftContract) public {
        nftContract = AdvancedNFT(_nftContract);
    }

    function createAuction(uint256 _tokenId, uint256 _startingPrice, uint256 _endingPrice, uint256 _duration) public {
        require(_tokenId > 0, "Invalid token ID");
        require(_startingPrice > 0, "Invalid starting price");
        require(_endingPrice > _startingPrice, "Invalid ending price");
        require(_duration > 0, "Invalid duration");

        uint256 _startTime = block.timestamp;
        uint256 _endTime = _startTime + _duration;

        Auction memory newAuction = Auction(
            auctionCount,
            msg.sender,
            _tokenId,
            _startingPrice,
            _endingPrice,
            _duration,
            _startTime,
            _endTime,
            true
        );

        auctions[auctionCount] = newAuction;
        auctionCount++;

        emit AuctionCreated(auctionCount - 1, msg.sender, _tokenId, _startingPrice, _endingPrice, _duration);
    }

    function bid(uint256 _auctionId, uint256 _amount) public {
        require(_auctionId < auctionCount, "Invalid auction ID");
        require(auctions[_auctionId].isActive, "Auction is not active");
        require(_amount > auctions[_auctionId].endingPrice, "Invalid bid amount");

        // Update auction ending price and winner
        auctions[_auctionId].endingPrice = _amount;
        auctions[_auctionId].winner = msg.sender;
    }

    function endAuction(uint256 _auctionId) public {
        require(_auctionId < auctionCount, "Invalid auction ID");
        require(auctions[_auctionId].isActive, "Auction is not active");
        require(block.timestamp >= auctions[_auctionId].endTime, "Auction has not ended");

        // Transfer NFT to winner
        nftContract.transferFrom(auctions[_auctionId].seller, auctions[_auctionId].winner, auctions[_auctionId].tokenId);

        // Update auction status
        auctions[_auctionId].isActive = false;

        emit AuctionEnded(_auctionId, auctions[_auctionId].winner, auctions[_auctionId].endingPrice);
    }

    function cancelAuction(uint256 _auctionId) public {
        require(_auctionId < auctionCount, "Invalid auction ID");
        require(auctions[_auctionId].isActive, "Auction is not active");
        require(msg.sender == auctions[_auctionId].seller, "Only seller can cancel auction");

        // Update auction status
        auctions[_auctionId].isActive = false;

        emit AuctionCancelled(_auctionId);
    }
}
