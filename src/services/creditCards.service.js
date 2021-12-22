const { creditCards } = require('../models');
const { encrypt, decrypt } = require('./crpyto.service');

module.exports = class {
    async post(data) {
        this.validateCardValues(data);

        const creditCard = await creditCards.create({
            card_name: data.card_name.trim(),
            card_number: this.encryptString(data.card_number),
            card_cvv: this.encryptString(data.card_cvv),
            card_expiration: this.formatExpDate(data.card_expiration)
        });

        creditCard.card_number = this.decryptString(creditCard.card_number);
        creditCard.card_cvv = this.decryptString(creditCard.card_cvv);

        return creditCard;
    }

    validateCardValues(card) {
        const { card_name, card_number, card_cvv, card_expiration } = card;

        if (!card_name) throw new Error('Card name is required.');
        if (typeof card_name !== 'string') throw new Error('Card name should be a string.');
        if (card_name.length > 80) throw new Error('Card name should max 80 characters.');
        
        if (!card_number) throw new Error('Card number is required.');
        if (typeof card_number !== 'string') throw new Error('Card number should be a string.');
        if (this.formatString(card_number).length !== 16) throw new Error('Card number should be 16 characters.');
        if (!this.luhnAlgorithmValid(this.formatString(card_number))) 
            throw new Error('The card number is invalid.');

        if (!card_cvv) throw new Error('Card cvv is required.');
        if (typeof card_cvv !== 'string') throw new Error('Card cvv should be a string.');
        if (parseInt(card_cvv) < 0) throw new Error('Card cvv is invalid.');
        if (card_cvv.length !== 3) throw new Error('Card cvv should be 3 characters.');

        if (!card_expiration || card_expiration == "") throw new Error('Expiration date is required.');
        if (typeof card_expiration !== 'string') throw new Error('Card expiration should be a string.');

        const expCardArr = card_expiration.split("/");
        if(!expCardArr || expCardArr.length < 2) throw new Error('Expiration date is invalid. Try send in this format MM/YYYY.');

        if(!parseInt(expCardArr[0]) || parseInt(expCardArr[0]) < 0 || parseInt(expCardArr[0]) > 12 )  
            throw new Error('The month in expiration date is invalid.');

        if(!parseInt(expCardArr[1]) || expCardArr[1].length < 4 || parseInt(expCardArr[1]) < new Date().getFullYear())  
            throw new Error('The year in expiration date is invalid.');
    }

    luhnAlgorithmValid(cardNumber) {
        let sum = 0;
        let even = false;
        cardNumber.split("").reverse().forEach((dstr) => { 
                let digit = parseInt(dstr);
                sum += ((even = !even) 
                    ? digit 
                    : (
                        (digit < 5) 
                            ? digit * 2 
                            : (digit - 5) * 2 + 1)
                    );
          });
        return (sum % 10 == 0);
    }

    formatString(cardNumber) {
        return cardNumber.replace(/[^0-9]+/ig, "");
    }

    encryptString(value) {
        return JSON.stringify(encrypt(this.formatString(value)))
    }

    decryptString(value) {
        return decrypt(JSON.parse(value))
    }

    formatExpDate(cardExpiration) {
        const expDate = new Date();

        let expCardArr = cardExpiration.split("/");

        expDate.setMonth(parseInt(expCardArr[0]) - 1);
        expDate.setFullYear(parseInt(expCardArr[1]));

        return expDate;
    }
}