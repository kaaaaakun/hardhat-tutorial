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
        // msg は関数呼び出し時に自動的に生成されるグローバル変数
        // msg.sender は関数を呼び出したアドレスを取得する
    }

    /**
     * 最新のメッセージを取得する関数
     */
    function getLatestMessage() external view returns (string memory) {
        require(messages[msg.sender].length > 0, "No messages found");
        // 配列の最後の要素を取得するが、配列が空の場合はエラーを返す
        return messages[msg.sender][messages[msg.sender].length - 1];
    }

    /**
     * 全てのメッセージを取得する関数
     */
    function getAllMessages() external view returns (string[] memory) {
        // error 処理はないが、空の配列を返すので問題ない
        return messages[msg.sender];
    }
}

