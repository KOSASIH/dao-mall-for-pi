pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/SafeERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Product {
    using SafeERC721 for AdvancedNFT;
    using SafeMath for uint256;

    struct ProductData {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 quantity;
        address seller;
        AdvancedNFT nft;
    }

    mapping (uint256 => ProductData) public products;
    uint256 public productCount;

    event ProductCreated(uint256 id, string name, string description, uint256 price, uint256 quantity, address seller);
    event ProductUpdated(uint256 id, string name, string description, uint256 price, uint256 quantity);
    event ProductSold(uint256 id, address buyer, uint256 quantity);

    function createProduct(string memory _name, string memory _description, uint256 _price, uint256 _quantity, AdvancedNFT _nft) public {
        uint256 _productId = productCount;
        ProductData storage product = products[_productId];
        product.id = _productId;
        product.name = _name;
        product.description = _description;
        product.price = _price;
        product.quantity = _quantity;
        product.seller = msg.sender;
        product.nft = _nft;

        productCount++;

        emit ProductCreated(_productId, _name, _description, _price, _quantity, msg.sender);
    }

    function updateProduct(uint256 _productId, string memory _name, string memory _description, uint256 _price, uint256 _quantity) public {
        ProductData storage product = products[_productId];
        product.name = _name;
        product.description = _description;
        product.price = _price;
        product.quantity = _quantity;

        emit ProductUpdated(_productId, _name, _description, _price, _quantity);
    }

    function buyProduct(uint256 _productId, uint256 _quantity) public {
        ProductData storage product = products[_productId];
        require(product.quantity >= _quantity, "Not enough quantity");
        product.quantity -= _quantity;

        emit ProductSold(_productId, msg.sender, _quantity);
    }
}
