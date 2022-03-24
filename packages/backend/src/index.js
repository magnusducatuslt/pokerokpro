const {ChainStore, PrivateKey, key, Aes} = require ("bitsharesjs");
function generateKeyFromPassword(accountName, role, password) {
    let seed = accountName + role + password;
    let privKey = PrivateKey.fromSeed(seed);
    let pubKey = privKey.toPublicKey().toString();

    return {privKey, pubKey};
}



// PLC62knp3wwKLbf96Cihk12bB3mT3i5ZVs7WBH32jTw87ruSQxEHX
console.log(generateKeyFromPassword('zempheroth','active','welcome123'))
// changePassword('P5KM7AD4h9JMicmmEZUnnvfDctMt5VStNfpQPc98vPBPx','P5KM7AD4h9JMicmmEZUnnvfDctMt5VStNfpQPc98vPBPx')
// validatePassword('P5KM7AD4h9JMicmmEZUnnvfDctMt5VStNfpQPc98vPBPx')