const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const sendButton = document.querySelector('#sendTx');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const displayBlockNumber = document.querySelector("#blockNumber");
const displayTrx = document.querySelector("#trx");

let acccounts;

async function checkBalance() {
  if (typeof ethereum !== undefined) {
    acccounts = await ethereum.request({ method: 'eth_requestAccounts' });

    //Get the balance
    const balance = await ethereum.request({method: "eth_getBalance", params: [accountInput.value, "latest"] })
    // Convert to number
    const parsedBalanced = parseInt(balance) / Math.pow(10, 18);
    displayBalance.innerText = parsedBalanced + " ETH";
  } else {
    console.log('No ethereum');
  }
}

async function sendFunds() {
  try {
    const amount = parseFloat(valueInput.value) * Math.pow(10,18) //översätter input till ett numeriskt värde från Hex
    let params = [{
      from: accountInput.value,
      to: toAccountInput.value,
      value: Number(amount).toString(16),
      gas: Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16)
    }];
    //Make the transaction
    const txHash = await ethereum.request({
          method: "eth_sendTransaction",
          params: params,
        });
      // Optionally, display the transaction hash
    console.log(`Transaction Hash: ${txHash}`);

    // Display the latest block number after the transaction is sent
    await displayBlock();

    // Display transaction parameters
    displayTrx.innerText = `
    Transaction Parameters:
    \nFrom:\n ${params[0].from}
    \nTo:\n ${params[0].to}
    \nValue:\n ${valueInput.value} ETH
    \nGas:\n ${21000}
    \nGas Price:\n ${2500000} Wei
    \nTransaction Hash:\n ${txHash}
    `;

  } catch (error) {
    console.log(error);
    displayTrx.innerText = `Error sending transaction: ${error.message}`;
  }
}

/* window.addEventListener('load', async () => {
  await displayBlock();
}); */

async function displayBlock() {
  const blockHex = await ethereum.request({ method: "eth_blockNumber", params: [] });
  const blockNumber = parseInt(blockHex, 16);
  displayBlockNumber.innerText = ("Most recent Block number: " + blockNumber);
};

checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendFunds);

//Transaction Hash: 0xd8f8920edb35d6d801c18f8cb3c42fcb59eb00834be1a54bb39148f74c97671f
