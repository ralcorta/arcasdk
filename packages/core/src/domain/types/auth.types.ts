export interface LoginTicketHeaderVersion {
  version: string;
}

export interface LoginTicketHeaderData {
  source: string;
  destination: string;
  uniqueid: string;
  generationtime: string;
  expirationtime: string;
}

export type LoginTicketHeaders = [
  LoginTicketHeaderVersion,
  LoginTicketHeaderData,
];

export interface LoginTicketCredentials {
  token: string;
  sign: string;
}

export interface ILoginCredentials {
  header: LoginTicketHeaders;
  credentials: LoginTicketCredentials;
}
