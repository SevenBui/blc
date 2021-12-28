// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/IERC1155.sol";
import "../../libraries/Address.sol";
import "../../libraries/Context.sol";
import "./interfaces/IERC1155Receiver.sol";
import "./interfaces/IERC1155MetadataURI.sol";
import "../ERC165/ERC165.sol";

contract ERC1155 is Context, ERC165, IERC1155, IERC1155MetadataURI {
  using Address for address;

  mapping(uint256 => mapping(address => uint256)) private _balances;
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  mapping(uint256 => string) private _tokenURIs;

  string public _name;
  string public _symbol;
  string private _uri;

  constructor(
    string memory name_,
    string memory symbol_
  ) {
    _setURI("ipfs://");
    _name = name_;
    _symbol = symbol_;
  }

  function _tokenURI(uint256 tokenId) internal view returns (string memory) {
    return _tokenURIs[tokenId];
  }

  function _setTokenURI(uint256 tokenId, string memory tokenUri)
    internal
    virtual
  {
    _tokenURIs[tokenId] = tokenUri;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC165, IERC165)
    returns (bool)
  {
    return
      interfaceId == type(IERC1155).interfaceId ||
      interfaceId == type(IERC1155MetadataURI).interfaceId ||
      super.supportsInterface(interfaceId);
  }

  function name() public view virtual override returns (string memory) {
    return _name;
  }

  function symbol() public view virtual override returns (string memory) {
    return _symbol;
  }

  function uri(uint256) public view virtual override returns (string memory) {
    return _uri;
  }

  function balanceOf(address account, uint256 id)
    public
    view
    virtual
    override
    returns (uint256)
  {
    require(
      account != address(0),
      "ERC1155: balance query for the zero address"
    );
    return _balances[id][account];
  }

  function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
    public
    view
    virtual
    override
    returns (uint256[] memory)
  {
    require(
      accounts.length == ids.length,
      "ERC1155: accounts and ids length mismatch"
    );

    uint256[] memory batchBalances = new uint256[](accounts.length);

    for (uint256 i = 0; i < accounts.length; ++i) {
      batchBalances[i] = balanceOf(accounts[i], ids[i]);
    }

    return batchBalances;
  }

  function setApprovalForAll(address operator, bool approved)
    public
    virtual
    override
  {
    require(
      _msgSender() != operator,
      "ERC1155: setting approval status for self"
    );

    _operatorApprovals[_msgSender()][operator] = approved;
    emit ApprovalForAll(_msgSender(), operator, approved);
  }

  function isApprovedForAll(address account, address operator)
    public
    view
    virtual
    override
    returns (bool)
  {
    return _operatorApprovals[account][operator];
  }

  function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public virtual override {
    require(
      from == _msgSender() || isApprovedForAll(from, _msgSender()),
      "ERC1155: caller is not owner nor approved"
    );
    _safeTransferFrom(from, to, id, amount, data);
  }

  function safeBatchTransferFrom(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public virtual override {
    require(
      from == _msgSender() || isApprovedForAll(from, _msgSender()),
      "ERC1155: transfer caller is not owner nor approved"
    );
    _safeBatchTransferFrom(from, to, ids, amounts, data);
  }

  function _safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) internal virtual {
    require(to != address(0), "ERC1155: transfer to the zero address");

    address operator = _msgSender();

    _beforeTokenTransfer(
      operator,
      from,
      to,
      _asSingletonArray(id),
      _asSingletonArray(amount),
      data
    );

    uint256 fromBalance = _balances[id][from];
    require(
      fromBalance >= amount,
      "ERC1155: insufficient balance for transfer"
    );
    unchecked {
      _balances[id][from] = fromBalance - amount;
    }
    _balances[id][to] += amount;

    emit Transfer(operator, from, to, id, amount);

    _doSafeTransferAcceptanceCheck(operator, from, to, id, amount, data);
  }

  function _safeBatchTransferFrom(
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual {
    require(
      ids.length == amounts.length,
      "ERC1155: ids and amounts length mismatch"
    );
    require(to != address(0), "ERC1155: transfer to the zero address");

    address operator = _msgSender();

    _beforeTokenTransfer(operator, from, to, ids, amounts, data);

    for (uint256 i = 0; i < ids.length; ++i) {
      uint256 id = ids[i];
      uint256 amount = amounts[i];

      uint256 fromBalance = _balances[id][from];
      require(
        fromBalance >= amount,
        "ERC1155: insufficient balance for transfer"
      );
      unchecked {
        _balances[id][from] = fromBalance - amount;
      }
      _balances[id][to] += amount;
    }

    emit TransferBatch(operator, from, to, ids, amounts);

    _doSafeBatchTransferAcceptanceCheck(operator, from, to, ids, amounts, data);
  }

  function _setURI(string memory newuri) internal virtual {
    _uri = newuri;
  }

  function _mint(
    address account,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) internal virtual {
    require(account != address(0), "ERC1155: mint to the zero address");

    address operator = _msgSender();

    _beforeTokenTransfer(
      operator,
      address(0),
      account,
      _asSingletonArray(id),
      _asSingletonArray(amount),
      data
    );

    _balances[id][account] += amount;
    emit Transfer(operator, address(0), account, id, amount);

    _doSafeTransferAcceptanceCheck(
      operator,
      address(0),
      account,
      id,
      amount,
      data
    );
  }

  function _mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual {
    require(to != address(0), "ERC1155: mint to the zero address");
    require(
      ids.length == amounts.length,
      "ERC1155: ids and amounts length mismatch"
    );

    address operator = _msgSender();

    _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);

    for (uint256 i = 0; i < ids.length; i++) {
      _balances[ids[i]][to] += amounts[i];
    }

    emit TransferBatch(operator, address(0), to, ids, amounts);

    _doSafeBatchTransferAcceptanceCheck(
      operator,
      address(0),
      to,
      ids,
      amounts,
      data
    );
  }

  function _burn(
    address account,
    uint256 id,
    uint256 amount
  ) internal virtual {
    require(account != address(0), "ERC1155: burn from the zero address");

    address operator = _msgSender();

    _beforeTokenTransfer(
      operator,
      account,
      address(0),
      _asSingletonArray(id),
      _asSingletonArray(amount),
      ""
    );

    uint256 accountBalance = _balances[id][account];
    require(accountBalance >= amount, "ERC1155: burn amount exceeds balance");
    unchecked {
      _balances[id][account] = accountBalance - amount;
    }

    emit Transfer(operator, account, address(0), id, amount);
  }

  function _burnBatch(
    address account,
    uint256[] memory ids,
    uint256[] memory amounts
  ) internal virtual {
    require(account != address(0), "ERC1155: burn from the zero address");
    require(
      ids.length == amounts.length,
      "ERC1155: ids and amounts length mismatch"
    );

    address operator = _msgSender();

    _beforeTokenTransfer(operator, account, address(0), ids, amounts, "");

    for (uint256 i = 0; i < ids.length; i++) {
      uint256 id = ids[i];
      uint256 amount = amounts[i];

      uint256 accountBalance = _balances[id][account];
      require(accountBalance >= amount, "ERC1155: burn amount exceeds balance");
      unchecked {
        _balances[id][account] = accountBalance - amount;
      }
    }

    emit TransferBatch(operator, account, address(0), ids, amounts);
  }

  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual {}

  function _doSafeTransferAcceptanceCheck(
    address operator,
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) private {
    if (to.isContract()) {
      try
        IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data)
      returns (bytes4 response) {
        if (response != IERC1155Receiver.onERC1155Received.selector) {
          revert("ERC1155: ERC1155Receiver rejected tokens");
        }
      } catch Error(string memory reason) {
        revert(reason);
      } catch {
        revert("ERC1155: transfer to non ERC1155Receiver implementer");
      }
    }
  }

  function _doSafeBatchTransferAcceptanceCheck(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) private {
    if (to.isContract()) {
      try
        IERC1155Receiver(to).onERC1155BatchReceived(
          operator,
          from,
          ids,
          amounts,
          data
        )
      returns (bytes4 response) {
        if (response != IERC1155Receiver.onERC1155BatchReceived.selector) {
          revert("ERC1155: ERC1155Receiver rejected tokens");
        }
      } catch Error(string memory reason) {
        revert(reason);
      } catch {
        revert("ERC1155: transfer to non ERC1155Receiver implementer");
      }
    }
  }

  function _asSingletonArray(uint256 element)
    private
    pure
    returns (uint256[] memory)
  {
    uint256[] memory array = new uint256[](1);
    array[0] = element;

    return array;
  }
}