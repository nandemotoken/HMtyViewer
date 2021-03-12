let useraddress;
let complete = 0;
let web3tr;

window.onload = async function() {
    $('#wallet-popup').modal('show');
    ethereum.on('chainChanged', (_chainId) => window.location.reload());
}


async function loadwallet(){
    $('#wallet-popup').modal('hide')
    await ethereum.enable();
    web3mm = await new Web3(web3.currentProvider);
    mmaddress = await web3mm.eth.getAccounts();
    useraddress = mmaddress[0];
    window.alert(useraddress);
    await checkxDai();
//    if (complete > 0){ window.alert("感謝が届いています！")  }
}

async function loadTorus(){

$('#wallet-popup').modal('hide')
    
const torus = new Torus({
  buttonPosition: "top-right" // default: bottom-left
});
await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mainnet", // default: mainnet
  },
  showTorusButton: true // default: true
});
await torus.login(); // await torus.ethereum.enable()
web3tr = await new Web3(torus.provider);
torusdata = await await web3tr.eth.getAccounts();
useraddress = torusdata[0];
window.alert(useraddress);
await checkxDai();
}


async function checkxDai(){
    const xdaiAddress = "0xE2931876A8cD0bc76A7114CFaA8232eF983532a3";
    const web3xdai = new Web3(new Web3.providers.HttpProvider("https://rpc.xdaichain.com/"))
    xdaicontract = await new web3xdai.eth.Contract(abi, xdaiAddress);
    xdaibalance = await xdaicontract.methods.balanceOf(useraddress).call() * 10e-19;
    if ( xdaibalance > 0){
    document.getElementById('xdaistatus').innerText = Math.ceil(xdaibalance);
        complete++;
        document.getElementById('message').innerText = "感謝が届いています！";    
    }
}

