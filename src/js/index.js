const Wallet = require("./models/Wallet").Wallet;

const addOperation = function(operation) {
    try {
        wallet.addOperation(operation);
    } catch(e){
        console.error(e);
    }
    
};

const removeOperation = function(id) {

    try {
        wallet.removeOperation(id);
    } catch(e){ // La variabile e sta per error
        console.error(e);
    }
    
}

const findOperation = function(val) {
    return wallet.findOperation(val);
}

const getBalance = function(){
    return wallet.getBalance();
}

const getOperations = function(){
    return wallet.getOperations();
}

window.addEventListener('DOMContentLoaded', function(){
    wallet = new Wallet();
});

