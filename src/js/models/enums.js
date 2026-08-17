const OpType = Object.freeze({ // Oggetto per definire i tipi di operazioni che possono essere effettuate nel wallet
    OUT: 'OUT', // Tipo di operazione per uscita di denaro
    IN: 'IN' // Tipo di operazione per entrata di denaro
});

const WalletErrors = Object.freeze({ // Oggetto per definire i tipi di errori che possono verificarsi nel wallet
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND'
});

module.exports = {
    OpType: OpType,
    WalletErrors: WalletErrors
}