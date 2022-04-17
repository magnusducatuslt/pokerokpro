pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./models/PokerMeta.sol";
import "./Token.sol";

contract TotalPokerNFT is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    mapping(uint256 => NftProperties) tokenIdToNftProperties;

    Token internal _Token;

    constructor(address TotalPokerToken) public ERC721("POKEROK", "TPNFT") {
        _Token = Token(TotalPokerToken);
    }

    function buyNftToken()public payable returns(bool){
        require(_Token.balanceOf(msg.sender) >= 100, "Not enough tokens");
        _Token.transfer(address(_Token), 100);
        mintNft(msg.sender);
        return true;
    }

    function mintNft(address to) public returns (uint256) {
        uint256 tokenId = _tokenIdTracker.current();

        super._mint(to, tokenId);

        console.log("token to ",to,"token id ",tokenId);

        NftProperties memory properties;

        properties.owner = to;

        tokenIdToNftProperties[tokenId] = properties;

        console.log("1",tokenIdToNftProperties[tokenId].owner);

        _tokenIdTracker.increment();

        return tokenId;
    }

    function getNftProperties(uint256 tokenId) public view returns (NftProperties memory nftProperties) {
        return tokenIdToNftProperties[tokenId];
    }
    function getA() public view returns(string memory){
        return "aaa";
    }
}