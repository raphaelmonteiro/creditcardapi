const CreditCardService = require('../services/creditCards.service');

module.exports = function(app){
    app.post('/', async (req, res) => {
        try {
            const creditCardService = new CreditCardService();
            const result = await creditCardService.post(req.body);
    
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message)
        }
    });
}