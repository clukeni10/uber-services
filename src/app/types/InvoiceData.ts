export interface InvoiceData {
  id: number;
  reference: string;
  issued_at: string;
  amount: number;
  platform_fee: number;
  worker_earnings: number;
  method: string;
  description: string;
  scheduled_at: string;
  category_name: string; 
  client: { name: string; email: string; phone: string; address: string };
  worker: { name: string; email: string; phone: string; specialty: string };
} 