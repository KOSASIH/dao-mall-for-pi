pragma solidity ^0.8.0;

contract NFT {
  struct NFTStruct {
    uint id;
    string name;
    string description;
    string image;
    address owner;
  }

  NFTStruct[] public nfts;

  function createNFT(string memory _name, string memory _description, string memory _image) public {
    uint nftId = nfts.length + 1;
    NFTStruct memory newNFT = NFTStruct({
      id: nftId,
      name: _name,
      description: _description,
      image: _image,
      owner: msg.sender
    });

    nfts.push(newNFT);
  }

  function buyNFT(uint _nftId) public payable {
    NFTStruct storage nft = nfts[_nftId];

    if (nft.owner != address(0)) {
      revert("NFT already owned.");
    }

    if (msg.value < 1 ether) {
      revert("Insufficient ether.");
    }

    nft.owner = msg.sender;
  }
}
