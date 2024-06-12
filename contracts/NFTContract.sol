pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/utils/Counters.sol";

contract NFTContract is ERC721, Ownable {
    using Counters for Counters.Counter;

    // Mapping of NFTs to their owners
    mapping (address => mapping (uint256 => NFT)) public nftOwners;

    // Mapping of NFTs to their metadata
    mapping (uint256 => NFTMetadata) public nftMetadata;

    // Counter for NFT IDs
    Counters.Counter public nftIdCounter;

    // Event emitted when an NFT is created
    event NFTCreated(uint256 indexed _nftId, address indexed _owner, string _name, string _description, string _image);

    // Event emitted when an NFT is transferred
    event NFTTransferred(uint256 indexed _nftId, address indexed _from, address indexed _to);

    // Event emitted when an NFT is burned
    event NFTBurned(uint256 indexed _nftId, address indexed _owner);

    // Struct to represent an NFT
    struct NFT {
        uint256 id;
        address owner;
        string name;
        string description;
        string image;
    }

    // Struct to represent NFT metadata
    struct NFTMetadata {
        string name;
        string description;
        string image;
    }

    /**
     * @dev Creates a new NFT with the given metadata and assigns it to the given owner
     * @param _owner The address of the owner
     * @param _name The name of the NFT
     * @param _description The description of the NFT
     * @param _image The image URL of the NFT
     */
    function createNFT(address _owner, string memory _name, string memory _description, string memory _image) public onlyOwner {
        uint256 newNftId = nftIdCounter.current();
        nftIdCounter.increment();

        NFT memory newNft = NFT(newNftId, _owner, _name, _description, _image);
        nftOwners[_owner][newNftId] = newNft;
        nftMetadata[newNftId] = NFTMetadata(_name, _description, _image);

        emit NFTCreated(newNftId, _owner, _name, _description, _image);
    }

    /**
     * @dev Transfers an NFT from one address to another
     * @param _from The address of the current owner
     * @param _to The address of the new owner
     * @param _nftId The ID of the NFT to transfer
     */
    function transferNFT(address _from, address _to, uint256 _nftId) public {
        require(nftOwners[_from][_nftId].owner == _from, "Only the owner can transfer this NFT");
        require(_to != address(0), "Cannot transfer to the zero address");

        nftOwners[_to][_nftId] = nftOwners[_from][_nftId];
        delete nftOwners[_from][_nftId];

        emit NFTTransferred(_nftId, _from, _to);
    }

    /**
     * @dev Burns an NFT, removing it from the contract
     * @param _owner The address of the owner
     * @param _nftId The ID of the NFT to burn
     */
    function burnNFT(address _owner, uint256 _nftId) public {
        require(nftOwners[_owner][_nftId].owner == _owner, "Only the owner can burn this NFT");

        delete nftOwners[_owner][_nftId];
        delete nftMetadata[_nftId];

        emit NFTBurned(_nftId, _owner);
    }

    /**
     * @dev Returns the metadata for an NFT
     * @param _nftId The ID of the NFT
     */
    function getNFTMetadata(uint256 _nftId) public view returns (string memory, string memory, string memory) {
        return (nftMetadata[_nftId].name, nftMetadata[_nftId].description, nftMetadata[_nftId].image);
    }

    /**
     * @dev Returns the owner of an NFT
     * @param _nftId The ID of the NFT
     */
    function getNFTOwner(uint256 _nftId) public view returns (address) {
        return nftOwners[address(this)][_nftId].owner;
    }
}
