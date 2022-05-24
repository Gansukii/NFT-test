// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NarutoNFT is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private baseURIextended;

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;

    address contractOwner;
    mapping(address => string[]) public walletMints;
    mapping(uint256 => string) private _tokenURIs;

    // * Enemy boss
    uint256 public bossHP;
    string public currentBossTokenURI;

    event attackSuccess(address sender, uint256 currentBossHP);

    constructor() payable ERC721("NarutoNFT", "Nar") {
        mintPrice = 0.002 ether;
        totalSupply = 50;
        maxPerWallet = 3;
        contractOwner = msg.sender;
    }

    // ! Boss functions
    function addBoss(string memory _tokenURI, uint256 _bossHP)
        public
        onlyOwner
        returns (uint256)
    {
        require(bossHP <= 0, "The boss has not been defeated yet");
        require(
            bytes(currentBossTokenURI).length == 0,
            "The boss has not been defeated yet"
        );
        bossHP = _bossHP;
        currentBossTokenURI = _tokenURI;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    function deleteBoss() public onlyOwner {
        bossHP = 0;
        currentBossTokenURI = "";
    }

    function getBossURI() public view returns (string memory) {
        return currentBossTokenURI;
    }

    function attack(uint256 damage) public payable {
        require(bossHP > 0, "The boss has already been defeated");
        bossHP -= damage;
        if (bossHP <= 0) {
            currentBossTokenURI = "";
        }
        emit attackSuccess(msg.sender, bossHP);
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURIextended = baseURI_;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURIextended;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // !If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // !If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // !If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function mint(string memory _tokenURI) public payable returns (uint256) {
        require(isPublicMintEnabled, "Public minting not enabled.");
        require(
            walletMints[msg.sender].length < maxPerWallet,
            "User cannot mint more NFTs"
        );
        require(
            msg.value == mintPrice,
            "You did not reach the needed fee to mint"
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        walletMints[msg.sender].push() = _tokenURI;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    function getWalletMints(address _accountAddress)
        public
        view
        returns (string[] memory)
    {
        return walletMints[_accountAddress];
    }
}
