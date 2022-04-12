import hmacSHA512 from 'crypto-js/hmac-sha512';

export const encrypt = async (word: string) =>
  Buffer.from(`${word}`).toString("base64");

export const decrypt = async (word: string) =>
  Buffer.from(word, "base64").toString();
