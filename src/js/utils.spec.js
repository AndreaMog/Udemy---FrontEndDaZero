const utils = require("./utils");
const Wallet = require("./models/Wallet");
const mockedStructure = require("../../jest/mockedStructure");

// SIMULAZIONE (MOCK) DI LOCALSTORAGE PER NODE
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

describe("Utils testing suite", function() {

    beforeEach(() => { // Chiama una Callback in modo abbrevato
        jest.clearAllMocks(); // Pulisce lo storico delle chiamate al mock prima di ogni it()
    });

    it("findIndex return correct index", function(){
        const list = [1, 2, 3, 4];
        const index = utils.findIndex(list, function(item) {
            return item === 3;
        });
        expect(index).toBe(2);
    });

    it("findIndex return -1 when item not found", function(){
        const list = [1, 2, 3, 4];
        const index = utils.findIndex(list, function(item) {
            return item === 10;
        });
        expect(index).toBe(-1);
    });

    it("isValidOperation returns true if operation is valid", function(){
        expect(utils.isValidOperation(mockedStructure.incomeOperation)).toBeTruthy();
    });

    it("isValidOperation returns false if operation is not valid", function(){
        expect(utils.isValidOperation(mockedStructure.invalidOperation)).toBeFalsy();
    });

    it("getWallet returns correct wallet if it extists in the local storage", function(){
        const wallet = {
            balance: 1000,
            operations: [mockedStructure.incomeOperation]
        }
        localStorage.getItem.mockReturnValue(JSON.stringify(wallet)); // 1. Diciamo al mock di restituire il nostro wallet convertito in stringa JSON
        expect(utils.getWallet()).toEqual(wallet);
    });

    it("getWallet returns standard wallet if it doesn't extists in the local storage", function(){
        global.localStorage.getItem.mockReturnValue(null); // 1. Diciamo al mock di restituire null (come farebbe il browser se la chiave non esiste)
        
        const wallet = { // 2. Oggetto atteso
            balance: 0,
            operations: []
        }
        expect(utils.getWallet()).toEqual(wallet); // 3. Eseguiamo la verifica
    });
 
});