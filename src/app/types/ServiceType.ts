export interface Service {
  id: number;
  description: string;
  scheduled_at: string;
  status: "pending" | "accepted" | "active" | "completed" | "cancelled";
  created_at: string;
  started_at: string;
  client_id: number;
  client_name: string;
  client_image: string;
  client_phone: string;
  amount: number;
  method: string;
  payment_status: string;
  category_name: string;
}