//Built with the following tutorial https://medium.com/@spenserhuang/learn-build-a-javascript-blockchain-part-1-ca61c285821e 


const SHA256 = require('crypto-js/sha256')

class Block {

    constructor (timeStamp, data) {
        this.index = 0; //Where chain block is located
        this.timeStamp = timeStamp; //shows when block was created
        this.data = data;
        this.previousHash = "0"; //Holds hash of previous block; maintains integrity of chain
        this.hash = this.calculateHash(); //Holds the block's own hash derived from the function
        this.nonce = 0; // A value used in mining difficulty requirement to satisfy mining difficulty requirement
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timeStamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {

    }
}

class Blockchain {
    constructor () {
        this.chain = [this.createGenesis()]; //Blockchain object will hold block objects as chain property
    }

    //first block in the blockchain is known as the 'Genesis Block'
    createGenesis() {
        return new Block(0, "01/01/2023", "Genesis block", "0") //Since its the first block, data will be manually inputted with the indices "0"
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.index = this.chain.length;
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock =  this.chain[i];
            const previousBlock = this.chain[i - 1];


            //used to check whether currentBlock's info has been tampered with without updating currentBlock.hash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            //Used to check whether or not a previousBlock has been tampered with
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let jsChain = new Blockchain();
jsChain.addBlock(new Block("12/25/2021", {amount: 20}));
jsChain.addBlock(new Block("12/26/2023", {amount: 10}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid?" + jsChain.checkValid());