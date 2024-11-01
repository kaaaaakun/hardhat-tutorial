// //  ローカルネットワークへの接続

// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
// };

//  リモートネットワークへの接続
require("@nomicfoundation/hardhat-toolbox");

// スクリプトを実行する前に、設定変数が設定されていることを確認してください
// const { vars } = require("hardhat/config");

// https://infura.io にアクセスし、サインアップして新しいAPIキーを作成し、
// ダッシュボードに追加して設定変数に追加してください
//  const INFURA_API_KEY = vars.get("INFURA_API_KEY");

// Sepoliaアカウントの秘密鍵を設定変数に追加してください
// Coinbase Walletから秘密鍵をエクスポートするには、
// 設定 > 開発者設定 > 秘密鍵を表示 に移動します
// Metamaskから秘密鍵をエクスポートするには、Metamaskを開き、
// アカウントの詳細 > 秘密鍵をエクスポート に移動します
// 注意: テストアカウントに実際のEtherを入れないでください
// const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const INFURA_API_KEY = "6c1109f241ab4df28479c8335bfcd384";
const SEPOLIA_PRIVATE_KEY = "知られてはいけない秘密鍵";

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
