pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Product.sol";

contract Store {
    using SafeERC721 for AdvancedNFT;
    using SafeMath for uint256;

    struct StoreData {
        uint256 id;
        string name;
        string description;
        address owner;
        mapping (uint256 => Product) products;
    }

    mapping (uint256 => StoreData) public stores;
    uint256 public storeCount;

    event StoreCreated(uint256 id, string name, string description, address owner);
    event ProductAdded(uint256 storeId, uint256 productId);
event ProductRemoved(uint256 storeId, uint256 productId);

    function createStore(string memory _name, string memory _description) public {
        uint256 _storeId = storeCount;
        StoreData storage store = stores[_storeId];
        store.id = _storeId;
        store.name = _name;
        store.description = _description;
        store.owner = msg.sender;

        storeCount++;

        emit StoreCreated(_storeId, _name, _description, msg.sender);
    }

    function addProductToStore(uint256 _storeId, uint256 _productId) public {
        StoreData storage store = stores[_storeId];
        Product product = products[_productId];
        store.products[_productId] = product;

        emit ProductAdded(_storeId, _productId);
    }

    function removeProductFromStore(uint256 _storeId, uint256 _productId) public {
        StoreData storage store = stores[_storeId];
        delete store.products[_productId];

        emit ProductRemoved(_storeId, _productId);
    }
}
