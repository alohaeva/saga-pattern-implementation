import { toNormalizedError } from '../normalError';
import { logger } from '../../logger';

const base64urlUnescape = (str: string) => {
  str += Array(5 - (str.length % 4)).join('=');
  return str.replace(/-/g, '+').replace(/_/g, '/');
};

const base64urlDecode = (str: string) => {
  return Buffer.from(base64urlUnescape(str), 'base64').toString();
};

export const decodeJwtString = (jwtString: string) => {
  const segments = jwtString.split('.');

  if (segments.length !== 3) {
    const error = toNormalizedError(new Error('Not enough or too many segments'));

    logger.error(error);
  }

  const headerSeg = segments[0];
  const payloadSeg = segments[1];
  const signatureSeg = segments[2];

  // base64 decode and parse JSON
  const header = JSON.parse(base64urlDecode(headerSeg));
  const payload = JSON.parse(base64urlDecode(payloadSeg));

  return {
    header: header,
    payload: payload,
    signature: signatureSeg,
  };
};
