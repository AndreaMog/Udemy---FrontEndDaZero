// SIMULAZIONE (MOCK) DI LOCALSTORAGE PER NODE
let store = {};

global.localStorage = {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; })
};

const WalletModule = require("./Wallet");
const mockedStructure = require("../../../jest/mockedStructure");
const WalletEnums = require("./enums");

describe("Wallet testing suite", function(){

    beforeEach(function() {
        jest.clearAllMocks();
        store = {}; // Reset dello storage prima di ogni test
    });

    it("First instance should be an empty Wallet", function(){
        const wallet = new WalletModule.Wallet();
        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });

    it("addOperation: it works adding the correct balance and operations list", function(){
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructure.incomeOperation);
        expect(wallet.getBalance()).toBe(mockedStructure.incomeOperation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });

    it("addOperation: it works removing the correct balance and operations list", function(){
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructure.outOperation);
        expect(wallet.getBalance()).toBe(-mockedStructure.outOperation.amount);
        expect(wallet.getOperations().length).toBe(1);
    });

    it("addOperation: fail adding the incorrect operation", function(){
        const wallet = new WalletModule.Wallet();
        try {
            wallet.addOperation(mockedStructure.invalidOperation);
        } catch (e) {
            expect(e.message).toBe(WalletEnums.WalletErrors.INVALID_OPERATION);
        }
    });

    it("findOperation: it works finding a corrent if a correct description", function(){
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructure.incomeOperation);
        const searchValue = mockedStructure.incomeOperation.description.substring(0, 2);
        const operationFound = wallet.findOperation(searchValue);
        expect(operationFound.length).toBe(1);
    });

    it("removeOperation: it works removing the correct balance and operations list", function(){
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructure.incomeOperation);
        const operations = wallet.getOperations(); 
        wallet.removeOperation(operations[0].date);

        expect(wallet.getBalance()).toBe(0);
        expect(wallet.getOperations().length).toBe(0);
    });

    it("removeOperation: it works restoring the correct balance and operations list", function(){
        jest.useFakeTimers();
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructure.incomeOperation);
        jest.advanceTimersByTime(10); // Avanza di 10ms per cambiare il timestamp

        wallet.addOperation(mockedStructure.outOperation);
        const operations = wallet.getOperations(); 
        wallet.removeOperation(operations[1].date);

        expect(wallet.getBalance()).toBe(1000);
        expect(wallet.getOperations().length).toBe(1);
    });

    it("removeOperation: fail if not passing operation id", function(){
        const wallet = new WalletModule.Wallet();
        try{
            wallet.addOperation(mockedStructure.incomeOperation); 
            wallet.removeOperation();
        } catch (e) {
            expect(e.message).toBe(WalletEnums.WalletErrors.OPERATION_NOT_FOUND);
        }
    });


    it("saveWallet: it works adding a new operation", function(){
        const wallet = new WalletModule.Wallet();
        wallet.addOperation(mockedStructure.incomeOperation);
        const savedWallet = localStorage.getItem("wallet");
        expect(JSON.parse(savedWallet)).toEqual({
            balance: wallet.getBalance(),
            operations: wallet.getOperations() 
        });
    });

});