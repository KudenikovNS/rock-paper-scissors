const crypto = require("crypto");

class CryptoUtils {
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  generateHMAC(key, message) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(message);
    return hmac.digest("hex");
  }
}

module.exports = CryptoUtils;
