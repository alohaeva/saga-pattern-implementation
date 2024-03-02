import { parseNumber } from '../utils/parse/parseNumber';
import { parseString } from '../utils/parse/parseString';

export const PORT = parseNumber(process.env.PORT, 9090);
export const DOMAIN_URL = parseString(process.env.DOMAIN_URL, 'http://localhost:3000');
export const COOKIE_SECRET = parseString(process.env.DOMAIN_URL, 'cookieSecret');
export const BROKER_PORT = parseNumber(process.env.BROKER_PORT, 5672);
export const BROKER_HOST = parseString(process.env.BROKER_HOST, 'localhost');
export const BROKER_PROTOCOL = parseString(process.env.BROKER_PROTOCOL, 'amqp');

export default {
  common: {
    domainUrl: DOMAIN_URL,
    cookieSecret: COOKIE_SECRET,
  },
  server: {
    port: PORT,
  },
  connections: {
    broker: {
      host: BROKER_HOST,
      port: BROKER_PORT,
      protocol: BROKER_PROTOCOL,
    },
  },
};
