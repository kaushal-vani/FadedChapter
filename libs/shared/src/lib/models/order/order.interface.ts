import { Product } from "@faded-chapter/utils";

export interface OrderItem {
    product: Product;
    size: string;
    quantity: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
    address: string;
    paymentMethod: "Credit Card" | "PayPal" | "Cash on Delivery";
    createdAt: Date;
  }
  