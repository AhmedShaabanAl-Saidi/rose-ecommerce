import { ShippingAddress } from '../../shipping-address/interfaces/shipping-address.interface';

export interface OrderInput {
  shippingAddress: Omit<ShippingAddress, 'id' | 'userId'>;
}

export interface OrderRes {
  status: string;
  data: any; // Order details
}

export interface CheckoutSessionRes {
  status: string;
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}
