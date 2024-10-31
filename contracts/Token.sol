// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageStorage {
    // アドレスごとにメッセージの配列を保存する
    mapping(address => string[]) private messages;

    /**
     * ユーザーがメッセージを追加する関数
     */
    function addMessage(string calldata _message) external {
        messages[msg.sender].push(_message);
    }

    /**
     * 最新のメッセージを取得する関数
     */
    function getLatestMessage() external view returns (string memory) {
        require(messages[msg.sender].length > 0, "No messages found");
        return messages[msg.sender][messages[msg.sender].length - 1];
    }

    /**
     * 全てのメッセージを取得する関数
     */
    function getAllMessages() external view returns (string[] memory) {
        return messages[msg.sender];
    }
}

