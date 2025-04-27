const connectWalletBtn = document.getElementById('connectWalletBtn');
const userAddressSpan = document.getElementById('userAddress');
const walletBalanceSpan = document.createElement('span');
walletBalanceSpan.id = 'walletBalance';
walletBalanceSpan.style.marginLeft = '1rem';
walletBalanceSpan.style.fontWeight = 'bold';
walletBalanceSpan.style.fontSize = '1rem';
walletBalanceSpan.style.color = '#f2a900';
document.querySelector('header div').appendChild(walletBalanceSpan);

const bigBitcoin = document.getElementById('bigBitcoin');
const clickCountSpan = document.getElementById('clickCount');
const walletWarning = document.getElementById('walletWarning');

const captchaContainer = document.getElementById('captchaContainer');
const captchaImage = document.getElementById('image');
const captchaInput = document.getElementById('submit');
const checkCaptchaBtn = document.getElementById('checkCaptchaBtn');
const captchaKey = document.getElementById('key');

let userAddress = null;
let clickCount = 0;
const pointerMultiplier = 1; // fixed at 1 since no upgrades

const maxSupply = 21000000000000; // 21 trillion in base units
let totalMined = 0;
let miningStopped = false;

let captchaRequired = false;
let captchaPassed = false;
let captchaTimeoutId = null;

const userMinedTokens = {};

function isMetaMaskInstalled() {
  return typeof window.ethereum !== 'undefined';
}

async function connectWallet() {
  if (!isMetaMaskInstalled()) {
    alert('MetaMask is not installed. Please install it to play.');
    return;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    userAddressSpan.textContent = userAddress;
    walletWarning.classList.add('hidden');
    resetCaptchaTimer();
    if (!userMinedTokens[userAddress]) {
      userMinedTokens[userAddress] = 0;
    }
    updateWalletBalance();
  } catch (error) {
    console.error('User rejected wallet connection', error);
  }
}

function updateWalletBalance() {
  if (userAddress && userMinedTokens[userAddress] !== undefined) {
    walletBalanceSpan.textContent = "Balance: " + userMinedTokens[userAddress] + " QBTC";
  } else {
    walletBalanceSpan.textContent = "";
  }
}

function generateCaptcha() {
  captchaInput.value = "";
  captchaPassed = false;
  bigBitcoin.style.pointerEvents = "none"; // disable clicking on bigBitcoin until captcha passed
  let uniquechar = "";
  const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.floor(Math.random() * randomchar.length));
  }
  captchaImage.innerHTML = uniquechar;
  captchaKey.innerHTML = "";
}

function checkCaptcha() {
  if (captchaInput.value === captchaImage.innerHTML) {
    captchaKey.innerHTML = "Matched";
    captchaPassed = true;
    hideCaptcha();
    resetCaptchaTimer();
    bigBitcoin.style.pointerEvents = "auto"; // enable clicking again
  } else {
    captchaKey.innerHTML = "Not Matched";
    generateCaptcha();
  }
}

function showCaptcha() {
  captchaRequired = true;
  captchaPassed = false;
  captchaContainer.style.display = "block";
  generateCaptcha();
}

function hideCaptcha() {
  captchaRequired = false;
  captchaContainer.style.display = "none";
}

function resetCaptchaTimer() {
  if (captchaTimeoutId) clearTimeout(captchaTimeoutId);
  const randomTime = (400 + Math.random() * 400) * 1000;
  captchaTimeoutId = setTimeout(() => {
    showCaptcha();
  }, randomTime);
}

function handleClick() {
  if (miningStopped) {
    alert("All QBitcoins have been mined. Mining is stopped.");
    return;
  }
  if (!userAddress) {
    walletWarning.classList.remove('hidden');
    return;
  }
  if (captchaRequired && !captchaPassed) {
    alert("Please complete the CAPTCHA to continue mining.");
    return;
  }
  if (totalMined >= maxSupply) {
    miningStopped = true;
    bigBitcoin.style.filter = "grayscale(100%)";
    bigBitcoin.style.pointerEvents = "none"; // disable clicking when mining stopped
    alert("All 21 trillion QBitcoins have been mined. Mining is now stopped.");
    return;
  }

  userMinedTokens[userAddress] = (userMinedTokens[userAddress] || 0) + pointerMultiplier;
  totalMined += pointerMultiplier;
  clickCount = userMinedTokens[userAddress];
  clickCountSpan.textContent = clickCount;
  updateWalletBalance();

  console.log("User " + userAddress + " mined " + pointerMultiplier + " QBitcoin tokens. Total mined: " + totalMined);
}

connectWalletBtn.addEventListener('click', connectWallet);
bigBitcoin.addEventListener('click', handleClick);
checkCaptchaBtn.addEventListener('click', checkCaptcha);
