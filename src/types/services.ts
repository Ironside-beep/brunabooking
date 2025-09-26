export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: 'hair' | 'eyebrows' | 'treatments';
  description?: string;
}

export interface CartItem extends Service {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  hairDescription: string;
}