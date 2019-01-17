module.paths.push('/usr/lib/node_modules')

const bip39 = require('bip39')
const crypto = require('crypto')
const hdkey = require('ethereumjs-wallet/hdkey')

class EthKeys {
    constructor (currencyCode) {
        this.currencyCode = currencyCode
    }

    /**
     * @return {{seed: *, xprv: *, xpub: *, currency_code: *}}
     */
    generateXprv () {
        let randomBytes = crypto.randomBytes(16)
        // noinspection JSCheckFunctionSignatures
        let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
        let hdwallet = hdkey.fromMasterSeed(mnemonic)

        let xprv = hdwallet.privateExtendedKey()
        let xpub = hdwallet.publicExtendedKey()

        return { seed: mnemonic, xprv: xprv, xpub: xpub, currencyCode: this.currencyCode }
    }

    setXprv (last) {
        let hdwallet = hdkey.fromExtendedKey(last.xprv)

        let xprv = hdwallet.privateExtendedKey()
        let xpub = hdwallet.publicExtendedKey()
        if (last.xprv !== xprv || last.xpub !== xpub) {
            throw new Error(PLZ! Check logic in xpub / xprv)
        }

        this.xprvID = last.id
        this.xprvHDWallet = hdwallet
    }

    getWallet (index) {
        let wallet = this.xprvHDWallet.deriveChild(index).getWallet()
        let address = wallet.getAddress()
        let prv = wallet.getPrivateKeyString()
        let pub = wallet.getPublicKeyString()

        // noinspection JSCheckFunctionSignatures
        return [this.currencyCode, this.xprvID, index, prv, '0x' + address.toString('hex'), pub.toString()]
    }
}

module.exports.init = function (currencyCode) {
    return new EthKeys(currencyCode)
}