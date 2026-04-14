export interface Address {
  _id: string;
  city: string;
  phone: string;
  street: string;
}

export interface ShippingAddressRes {
  status: string;
  message: string;
  addresses: Address[];
}

export interface OrderInput {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
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
