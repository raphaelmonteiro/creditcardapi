const request = require('supertest');
const app = require('../../server');


let CreditCardObj;

beforeEach(() => {
    CreditCardObj = {
        card_name: `Raphael Monteiro Lima`, 
        card_number: "6771-8941-2035-6845", 
        card_cvv: "123", 
        card_expiration: '10/2028'  
    }
})

describe('test the Credit Card post route.', () => {
    it('When the body is correct then show response 200 and return the object CreditCard.', async () => {
        const res = await request(app).post(`/`).send(CreditCardObj)
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('card_name');
        expect(res.body).toHaveProperty('card_number');
        expect(res.body).toHaveProperty('card_cvv');
        expect(res.body).toHaveProperty('card_expiration');
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('createdAt');
    });

    it('When the body there isnt card_name then show response 500 and return message error.', async () => {
        CreditCardObj.card_name = undefined;

        const res = await request(app).post(`/`).send(CreditCardObj)

        expect(res.statusCode).toEqual(500);
        expect(res.error.text).toEqual('Card name is required.');
    });

    it('When the card_number is invalid then show response 500 and return message error.', async () => {
        CreditCardObj.card_number = "6772894120356845";

        const res = await request(app).post(`/`).send(CreditCardObj)

        expect(res.statusCode).toEqual(500);
        expect(res.error.text).toEqual('The card number is invalid.');
    });
    it('when the cvv card comes back it should be presented as sent.', async () => {
        const res = await request(app).post(`/`).send(CreditCardObj)

        expect(res.statusCode).toEqual(200);
        expect(res.body.card_cvv).toEqual('123');
    });
});