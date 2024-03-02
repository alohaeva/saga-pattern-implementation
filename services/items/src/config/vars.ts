import { parseNumber } from '../utils/parse/parseNumber';
import { parseString } from '../utils/parse/parseString';

export const PORT = parseNumber(process.env.PORT, 8000);
export const DOMAIN_URL = parseString(process.env.DOMAIN_URL, 'http://localhost:3000');
export const COOKIE_SECRET = parseString(process.env.COOKIE_SECRET, 'cookieSecret');
export const BROKER_PORT = parseNumber(process.env.BROKER_PORT, 5672);
export const BROKER_HOST = parseString(process.env.BROKER_HOST, 'localhost');
export const BROKER_PROTOCOL = parseString(process.env.BROKER_PROTOCOL, 'amqp');
export const MONGO_DB_HOST = parseString(process.env.MONGO_DB_HOST, '127.0.0.1');
export const MONGO_DB_PORT = parseNumber(process.env.MONGO_DB_PORT, 27017);
export const MONGO_DB_TABLE_NAME = parseString(process.env.MONGO_DB_TABLE_NAME, 'items');

export default {
  common: {
    domainUrl: DOMAIN_URL,
    cookieSecret: COOKIE_SECRET,
  },
  server: {
    port: PORT || 8000,
  },
  connections: {
    broker: {
      host: BROKER_HOST,
      port: BROKER_PORT,
      protocol: BROKER_PROTOCOL,
    },
    mongo: {
      uri: `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_TABLE_NAME}?replicaSet=rs0&directConnection=true`,
    },
  },
};
