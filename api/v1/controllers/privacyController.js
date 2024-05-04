const crypto = require('crypto');

exports.encryptData = (req, res) => {
  try {
    const cipher = crypto.createCipher('aes-256-cbc', <ENCRYPTION_KEY>);
    let encrypted = cipher.update(req.body.data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    res.json({ encrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.decryptData = (req, res) => {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', <ENCRYPTION_KEY>);
    let decrypted = decipher.update(req.body.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    res.json({ decrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
