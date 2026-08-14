export default interface MailDetails {
    name: string;
    userEmail: string;
    message: string;
  }

export interface JobEmailDetails {
  clientEmail: string;
  beforeCount: number;
  afterCount: number;
}