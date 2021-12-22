const { encrypt, decrypt } = require('../../services/crpyto.service');

describe('Test encrypt and decrypt string on CrpytoService', () => {
    it('When the card cvv is sent then should be returned encrypted', () => {
        const cvv = "012";

        const cvvEncrypted = encrypt(cvv);

        expect(cvvEncrypted).not.toBeNull();
        expect(cvv).toEqual(decrypt(cvvEncrypted));
    })
});