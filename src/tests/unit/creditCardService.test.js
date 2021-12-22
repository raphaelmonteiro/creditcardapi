// const request = require('supertest');
const CreditCardService = require('../../services/creditCards.service');
const faker = require('faker');

let CreditCardClass;
let CreditCardObj;

beforeEach(() => {
    CreditCardClass = new CreditCardService();

    CreditCardObj = {
        card_name: `Raphael Monteiro Lima`, 
        card_number: "6771-8941-2035-6845", 
        card_cvv: "123", 
        card_expiration: '10/2028'  
    }
})

describe('Test the function formatString on CreditCardService', () => {
    it('When the card number has a trace then should be remove without a trace', () => {
        const expectedCardNumber = CreditCardClass.formatString("6771-8941-2035-6845");
        expect(expectedCardNumber).toEqual("6771894120356845");
    })
    it('When the card number has a space then should be remove without a space', () => {
        const expectedCardNumber = CreditCardClass.formatString("6771 8941 2035 6845");
        expect(expectedCardNumber).toEqual("6771894120356845");
    })
    it('When the card number has a letter then should be remove without a letter', () => {
        const expectedCardNumber = CreditCardClass.formatString("6771 894D 203E 6845");
        expect(expectedCardNumber).toEqual("67718942036845");
    })
});

describe('Test the function luhnAlgorithmValid on CreditCardService', () => {
    it('When the card number is real then should be return true', () => {
        const expectedCardNumber = CreditCardClass.luhnAlgorithmValid("6771894120356845");
        expect(expectedCardNumber).toEqual(true);
    })
    it('When the card number is not real then should be return true', () => {
        const expectedCardNumber = CreditCardClass.luhnAlgorithmValid("6771894120356844");
        expect(expectedCardNumber).toEqual(false);
    })
});

describe('Test the function validateCardValues on CreditCardService', () => {
    it('When the card name is undefined then should be return error.', () => {
        try {
            CreditCardObj.card_name = undefined;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card name is required.");
        }
    })
    it('When the card name is empty then should be return error.', () => {
        try {
            CreditCardObj.card_name = "";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card name is required.");
        }
    })
    it('When the card name is number then should be return error.', () => {
        try {
            CreditCardObj.card_name = 12345;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card name should be a string.");
        }
    })
    it('When the card name is big than 80 then should be returned ', () => {
        try {
            CreditCardObj.card_name = faker.datatype.string(81);
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card name should max 80 characters.");
        }
    })
    it('When the card number is undefined then should be returned ', () => {
        try {
            CreditCardObj.card_number = undefined;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card number is required.");
        }
    })
    it('When the card number is empty then should be returned ', () => {
        try {
            CreditCardObj.card_number = "";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card number is required.");
        }
    })
    it('When the card number is number then should be returned ', () => {
        try {
            CreditCardObj.card_number = parseInt(faker.finance.creditCardNumber("mastercard").replaceAll('-', ''));
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card number should be a string.");
        }
    })
    it('When the card number is big than 16 then should be returned ', () => {
        try {
            CreditCardObj.card_number = faker.finance.creditCardNumber("mastercard").replaceAll('-', '0');
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card number should be 16 characters.");
        }
    })
    it('When the card number is invalid then should be returned', () => {
        try {
            CreditCardObj.card_number = "0000111122223333";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("The card number is invalid.");
        }
    })
    it('When the card cvv is undefined then should be returned ', () => {
        try {
            CreditCardObj.card_cvv = undefined;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card cvv is required.");
        }
    })
    it('When the card cvv is empty then should be returned ', () => {
        try {
            CreditCardObj.card_cvv = "";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card cvv is required.");
        }
    })
    it('When the card cvv is number then should be returned ', () => {
        try {
            CreditCardObj.card_cvv = 123;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card cvv should be a string.");
        }
    })
    it('When the card cvv is less than 0 then should be returned ', () => {
        try {
            CreditCardObj.card_cvv = "-0001";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card cvv is invalid.");
        }
    })
    it('When the card cvv is length than 3 then should be returned ', () => {
        try {
            CreditCardObj.card_cvv = "0001";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card cvv should be 3 characters.");
        }
    })
    it('When the card expiration is number then should be returned ', () => {
        try {
            CreditCardObj.card_expiration = 2022;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Card expiration should be a string.");
        }
    })
    it('When the card expiration is undefined then should be returned ', () => {
        try {
            CreditCardObj.card_expiration = undefined;
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Expiration date is required.");
        }
    })
    it('When the card expiration is empty then should be returned ', () => {
        try {
            CreditCardObj.card_expiration = "";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Expiration date is required.");
        }
    })
    it('When the card expiration is just a year or month then should be returned', () => {
        try {
            CreditCardObj.card_expiration = "2022";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Expiration date is invalid. Try send in this format MM/YYYY.");
        }
    })
    it('When the card expiration is just a year or month then should be returned', () => {
        try {
            CreditCardObj.card_expiration = "2022";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("Expiration date is invalid. Try send in this format MM/YYYY.");
        }
    })
    it('When the card expiration have an invalid month then should be returned', () => {
        try {
            CreditCardObj.card_expiration = "13/2022";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("The month in expiration date is invalid.");
        }
    })
    it('When the card expiration have an invalid year then should be returned', () => {
        try {
            CreditCardObj.card_expiration = "01/2020";
            CreditCardClass.validateCardValues(CreditCardObj);
        } catch (error) {
            expect(error.message).toEqual("The year in expiration date is invalid.");
        }
    })
})