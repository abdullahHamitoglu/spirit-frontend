import UAParser from 'ua-parser-js';

export function getUserAgent(req) {
  const parser = new UAParser();
  const osDetails = parser.getResult().os;

  return osDetails;
}