const { expect } = require("chai");

describe("MessageStorage", function () {
  let MessageStorage, messageStorage, owner, addr1, addr2;

  beforeEach(async function () {
    // コントラクトのデプロイ
    MessageStorage = await ethers.getContractFactory("MessageStorage");
    [owner, addr1, addr2] = await ethers.getSigners();
    messageStorage = await MessageStorage.deploy();
  });

  it("Should allow the owner to add and retrieve messages", async function () {
    // メッセージを追加
    await messageStorage.addMessage("Hello from owner");
    await messageStorage.addMessage("Another message from owner");

    // 最新のメッセージを取得し確認
    expect(await messageStorage.getLatestMessage()).to.equal("Another message from owner");

    // すべてのメッセージを取得し確認
    const messages = await messageStorage.getAllMessages();
    expect(messages).to.deep.equal(["Hello from owner", "Another message from owner"]);
  });

  it("Should allow different addresses to have separate message arrays", async function () {
    // アドレス1がメッセージを追加
    await messageStorage.connect(addr1).addMessage("Message from addr1");
    await messageStorage.connect(addr1).addMessage("Another message from addr1");

    // アドレス2がメッセージを追加
    await messageStorage.connect(addr2).addMessage("Message from addr2");

    // アドレス1の最新メッセージを取得し確認
    expect(await messageStorage.connect(addr1).getLatestMessage()).to.equal("Another message from addr1");

    // アドレス2の最新メッセージを取得し確認
    expect(await messageStorage.connect(addr2).getLatestMessage()).to.equal("Message from addr2");

    // アドレス1の全メッセージを取得し確認
    const messagesAddr1 = await messageStorage.connect(addr1).getAllMessages();
    expect(messagesAddr1).to.deep.equal(["Message from addr1", "Another message from addr1"]);

    // アドレス2の全メッセージを取得し確認
    const messagesAddr2 = await messageStorage.connect(addr2).getAllMessages();
    expect(messagesAddr2).to.deep.equal(["Message from addr2"]);
  });

  it("Should revert when getting the latest message if there are no messages", async function () {
    // メッセージがない状態での最新メッセージ取得がリバートすることを確認
    await expect(messageStorage.getLatestMessage()).to.be.revertedWith("No messages found");

    // アドレス1でも同様にリバートすることを確認
    await expect(messageStorage.connect(addr1).getLatestMessage()).to.be.revertedWith("No messages found");
  });

  it("Should return an empty array if there are no messages", async function () {
    // メッセージがない状態で全メッセージを取得し、空の配列を確認
    const messages = await messageStorage.getAllMessages();
    expect(messages).to.deep.equal([]);

    // アドレス1でも同様に空の配列を確認
    const messagesAddr1 = await messageStorage.connect(addr1).getAllMessages();
    expect(messagesAddr1).to.deep.equal([]);
  });
});

