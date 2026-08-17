const WalletEnums = require("./models/enums");

function findIndex(list, callback){ // Funzione per trovare l'indice di un elemento in una lista che soddisfa una condizione specificata da una callback
    
    for(var i = 0; i < list.length; i++){
        if(callback(list[i])){
            return i;
        }
    }

    return -1;

}

function isValidOperation(operation) { // Funzione per verificare se un'operazione è valida, controllando se esiste, se ha una descrizione, se l'importo è maggiore di 0 e se il tipo è valido
    return operation && 
           operation.description && 
           parseFloat(operation.amount) > 0 && 
           typeof WalletEnums.OpType[operation.type] !== 'undefined'; // Controlla se l'operazione esiste, se ha una descrizione, se un importo maggiore di 0 e se è un tipo valido
}

function getWallet() { // Funzione per ottenere il wallet dal localStorage, se non esiste ne crea uno nuovo con bilancio 0 e nessuna operazione

    const wallet = localStorage.getItem('wallet'); // Prova a prendere il wallet dal localStorage

    if(!wallet) { // Se non esiste, crea un nuovo wallet con bilancio 0 e nessuna operazione
        return {
            balance: 0,
            operations: []
        }
    }

    return JSON.parse(wallet); // Se esiste, restituisci il wallet convertito da JSON

}

module.exports = {
    getWallet: getWallet,
    isValidOperation: isValidOperation, 
    findIndex: findIndex
}