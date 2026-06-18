const OperationTypes = Object.freeze({ // Oggetto per definire i tipi di operazioni che possono essere effettuate nel wallet
    OUT: 'OUT', // Tipo di operazione per uscita di denaro
    IN: 'IN' // Tipo di operazione per entrata di denaro
});

const WalletErrors = Object.freeze({ // Oggetto per definire i tipi di errori che possono verificarsi nel wallet
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND'
});

function Wallet(){

    let balance = 0;
    let operations = [];

    // Funzione privata di inizializzazione del wallet, che prende i dati dal localStorage o crea un nuovo wallet se non esiste
    function init() {
        const wallet = getWallet(); // Chiama la funzione e prende i dati (nuovi o salvati)
        balance = wallet.balance; // Imposta il bilancio iniziale del wallet
        operations = wallet.operations; // Imposta le operazioni iniziali
    }

    // Funzione privata per salvare il wallet nel localStorage, che prende un oggetto wallet e lo converte in JSON prima di salvarlo
    function saveWallet() { // Funzione per salvare il wallet nel localStorage
        localStorage.setItem('wallet', JSON.stringify({ balance: balance, operations: operations })); // Salva il wallet convertito in JSON nel localStorage
    }

    // Funzioni pubbliche per gestire le operazioni e il bilancio del wallet
    this.addOperation = function(operation) {

        if(!isValidOperation(operation)) { // Controlla se l'operazione è valida, se no esce dalla funzione
            throw new Error(WalletErrors.INVALID_OPERATION); // Lancia un errore se l'operazione non è valida
        }

        const newOperation = {
            amount: parseFloat(operation.amount), // Converte l'importo in un numero decimale
            description: operation.description.trim(), // Prende la descrizione dell'operazione
            type: operation.type, // Prende il tipo dell'operazione (IN o OUT)
            date: new Date().getTime() // Aggiunge la data corrente in millisecondi 
        }  

        if(newOperation.type === OperationTypes.IN) { // Se l'operazione è di tipo IN, aggiungi l'importo al bilancio
            balance += newOperation.amount; // Aggiunge l'importo al bilancio
        } else if (newOperation.type === OperationTypes.OUT) { // Se l'operazione è di tipo OUT, sottrai l'importo dal bilancio
            balance -= newOperation.amount; // Sottrae l'importo dal bilancio
        }

        operations.push(newOperation); // Aggiunge operation all'array delle operazioni
        saveWallet(); // Salva il wallet aggiornato nel localStorage

    }

    this.removeOperation = function(id) { // Il parametro id è l'identificatore dell'operazione da rimuovere, che in questo caso è la data in millisecondi (timestamp) dell'operazione
        
        const operationIndex = findIndex(operations, function(operation){
            return operation.date === id;
        }); 

        if(operationIndex === -1) { // Verifica se l'operazione da rimuovere è stata trovata, se no lancia un errore
            throw new Error(WalletErrors.OPERATION_NOT_FOUND); // Lancia un errore se l'operazione non è stata trovata
        }

        const operation = operations[operationIndex]; // Salva l'operazione trovata in una variabile per poterla utilizzare dopo 
        if(operation.type == OperationTypes.IN){ // Verifica il tipo dell'operazione da rimuovere, se è di tipo IN, sottrai l'importo dal bilancio per annullare l'effetto dell'operazione
            balance -= operation.amount; // Rimuove l'importo dal bilancio
        } else if(operation.type == OperationTypes.OUT){ //Verifica se è di tipo OUT, aggiungi l'importo al bilancio per annullare l'effetto dell'operazione
            balance += operation.amount; // Aggiunge l'importo al bilancio
        }

        operations.splice(operationIndex, 1); // Rimuove un operazione dall'array di operazioni
        saveWallet(); 

    }

    this.findOperation = function(searchValue) {
        const val = searchValue.toLowerCase().trim();
        const operationFound = [];

        for(var i = 0; i < operations.length; i++) { 
            var description = operations[i].description.toLowerCase();
            if(description.indexOf(val) > -1) { 
                operationFound.push(operations[i]);
                break; // Rimuovere il break se si volgiono trovare tutte le operazioni e non solo la prima
            }
        }

        return operationFound;
    }

    this.getBalance = function(){
        return balance;
    }

    this.getOperations = function(){
        return operations;
    }

    // Funzioni invocate che crea una nuova istanza del nostro portafoglio, e inizializza i dati del wallet (bilancio e operazioni) con quelli salvati nel localStorage o con quelli di default se non esistono
    init(); // Inizializza il wallet quando viene creato

}