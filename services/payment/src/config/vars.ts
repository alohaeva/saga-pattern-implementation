import { parseNumber } from '../utils/parse/parseNumber';
import { parseString } from '../utils/parse/parseString';

export const PORT = parseNumber(process.env.PORT, 8100);
export const DOMAIN_URL = parseString(process.env.DOMAIN_URL, 'http://localhost:3000');
export const COOKIE_SECRET = parseString(process.env.DOMAIN_URL, 'cookieSecret');
export const BROKER_PORT = parseNumber(process.env.BROKER_PORT, 5672);
export const BROKER_HOST = parseString(process.env.BROKER_HOST, 'localhost');
export const BROKER_PROTOCOL = parseString(process.env.BROKER_PROTOCOL, 'amqp');
export const PK_PAYMENT_KEY = parseString(
  process.env.PK_PAYMENT_KEY,
  'pk_test_51OHMO2E1Ic15AGPlWjI3FTBAn5X7TQAYtxkSJOtOzwL4RElQwx7ro7737VWIfU37Wu0Nvh9unGNMbNIGSMDMBGdn00Me1WBGEr'
);
export const SK_PAYMENT_KEY = parseString(
  process.env.SK_PAYMENT_KEY,
  'sk_test_51OHMO2E1Ic15AGPlq28pYGxFxvf429JkyTsLDBGuOYAjNVBUEmjjxKRsYrFcG8RfrAAtFzz5u21yVlXzWvpqFVwI00C9ekT43r'
);

export default {
  common: {
    domainUrl: DOMAIN_URL,
    cookieSecret: COOKIE_SECRET,
    paymentPublicToken: PK_PAYMENT_KEY,
    paymentSecretToken: SK_PAYMENT_KEY,
  },
  server: {
    port: PORT || 8100,
  },
  connections: {
    broker: {
      host: BROKER_HOST,
      port: BROKER_PORT,
      protocol: BROKER_PROTOCOL,
    },
  },
};
