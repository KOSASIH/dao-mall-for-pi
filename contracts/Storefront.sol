pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Product.sol";

contract Storefront {
    using SafeERC721 for AdvancedNFT;
    using SafeMath for uint256;

    struct StorefrontData {
        uint256 id;
        string name;
        string description;
       address owner;
        mapping (uint256 => Product) products;
    }

    mapping (uint256 => StorefrontData) public storefronts;
    uint256 public storefrontCount;

    event StorefrontCreated(uint256 id, string name, string description, address owner);
    event ProductAdded(uint256 storefrontId, uint256 productId);
    event ProductRemoved(uint256 storefrontId, uint256 productId);

    function createStorefront(string memory _name, string memory _description) public {
        uint256 _storefrontId = storefrontCount;
        StorefrontData storage storefront = storefronts[_storefrontId];
        storefront.id = _storefrontId;
        storefront.name = _name;
        storefront.description = _description;
        storefront.owner = msg.sender;

        storefrontCount++;

        emit StorefrontCreated(_storefrontId, _name, _description, msg.sender);
    }

    function addProductToStorefront(uint256 _storefrontId, uint256 _productId) public {
        StorefrontData storage storefront = storefronts[_storefrontId];
        Product product = products[_productId];
        storefront.products[_productId] = product;

        emit ProductAdded(_storefrontId, _productId);
    }

    function removeProductFromStorefront(uint256 _storefrontId, uint256 _productId) public {
        StorefrontData storage storefront = storefronts[_storefrontId];
        delete storefront.products[_productId];

        emit ProductRemoved(_storefrontId, _productId);
    }
}
