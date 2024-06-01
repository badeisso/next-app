const crypt = require('crypto');

export function encryptPassword(password: string) {
    const cipher = crypt.createCipheriv('aes-256-cbc', String(process.env.AUTH_KEY), process.env.AUTH_SECRET);
    const encrypted = cipher.update(password, "utf8", "base64") + cipher.final("base64");
    return encrypted;
}

export function decryptPassword(password: string) {
    const decipher = crypt.createDecipheriv("aes-256-cbc", String(process.env.AUTH_KEY), process.env.AUTH_SECRET);
    const decrypted = decipher.update(password, "base64", "utf8") + decipher.final("utf8");
    return decrypted;
}

