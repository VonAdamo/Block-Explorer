const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const sendButton = document.querySelector('#sendTx');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const displayBlockNumber = document.querySelector("#blockNumber");

let acccounts;

async function checkBalance() {
  if (typeof ethereum !== undefined) {
    acccounts = await ethereum.request({ method: 'eth_requestAccounts' });

    //Get the balance
    const balance = await ethereum.request({method: "eth_getBalance", params: [accountInput.value, "latest"] })
    // Convert to number
    const parsedBalanced = parseInt(balance) / Math.pow(10, 18);
    displayBalance.innerText = parsedBalanced;
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
    },
  ];
    //Make the transaction
  await ethereum.request({
        method: "eth_sendTransaction",
        params: params,
      });

      // Display the latest block number after the transaction is sent
    await displayBlock();

    } catch (error) {
      console.log(error);
    }
}

/* window.addEventListener('load', async () => {
  await displayBlock();
}); */

async function displayBlock() {
  const blockHex = await ethereum.request({ method: "eth_blockNumber", params: [] });
  const blockNumber = parseInt(blockHex, 16);
  displayBlockNumber.innerText = blockNumber;
};

checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendFunds);
