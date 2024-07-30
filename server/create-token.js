const crypto = require('crypto')

// Generate a 256-bit (32-byte) base64 encoded secret
const secret = crypto.randomBytes(32).toString("base64")

console.log(secret)
