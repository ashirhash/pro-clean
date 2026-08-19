export default interface MailDetails {
    name: string;
    userEmail: string;
    message: string;
  }

export interface CategoryCount {
  label: string;
  count: number;
}

export interface JobEmailDetails {
  clientEmail: string;
  beforeCount: number;
  afterCount: number;
  invoiceFileName?: string;
  beforeCategories?: CategoryCount[];
  afterCategories?: CategoryCount[];
}