from web3 import Web3
import json

# InfuraのSepoliaネットワークに接続
w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'))

# アカウントと秘密鍵の設定
account_0 = w3.toChecksumAddress('YOUR_ACCOUNT_ADDRESS')
private_key = 'YOUR_PRIVATE_KEY'

# ローカルに保存されたABIを読み込む
with open('artifacts/contracts/MessageStorage.sol/MessageStorage.json', 'r') as file:
    contract_json = json.load(file)
    abi = contract_json['abi']

# デプロイされたコントラクトのアドレス
contract_address = '0xc0E6bD0c26F33F3D9cd9AcA62F9eAbC87d9c82Ae'

# デプロイされたコントラクトのインスタンスを作成
contract_instance = w3.eth.contract(address=contract_address, abi=abi)

# メッセージを追加
def add_message(message):
    tx = contract_instance.functions.addMessage(message).buildTransaction({
        'from': account_0,
        'nonce': w3.eth.getTransactionCount(account_0),
        'gas': 1728712,
        'gasPrice': w3.toWei('21', 'gwei')
    })
    signed_tx = w3.eth.account.signTransaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    w3.eth.waitForTransactionReceipt(tx_hash)
    print(f"Message '{message}' added.")

# 最新のメッセージを取得
def get_latest_message():
    latest_message = contract_instance.functions.getLatestMessage().call()
    print(f"Latest message: {latest_message}")

# 全てのメッセージを取得
def get_all_messages():
    all_messages = contract_instance.functions.getAllMessages().call()
    print(f"All messages: {all_messages}")

# メッセージを追加
add_message("Hello from Python")

# 最新のメッセージを取得
get_latest_message()

# 全てのメッセージを取得
get_all_messages()