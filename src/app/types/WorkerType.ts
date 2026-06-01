export interface Worker {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
    specialty: string;
    bio: string;
    hourly_rate: number;
    rating_avg: number;
    is_available: boolean;
}

export interface UseWorkersParams {
    search?: string;
    category?: string;
    city?: string;
}

export interface WorkerProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  image: string;
  specialty: string;
  bio: string;
  hourly_rate: number;
  rating_avg: number;
  is_available: boolean;
  total_earnings: number;
}