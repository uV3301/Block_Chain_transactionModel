const Block = require('./models/blockchain')

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block("01/01/2017", "Genesis block")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.index = this.latestBlock().index+1;
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let chainroot = new Blockchain();
chainroot.addBlock(new Block("12/25/2017", {amount: 5}));
chainroot.addBlock(new Block("12/26/2017", {amount: 10}));

console.log(JSON.stringify(chainroot, null, 4));
console.log("Block Chain Validation :" + chainroot.checkValid());
