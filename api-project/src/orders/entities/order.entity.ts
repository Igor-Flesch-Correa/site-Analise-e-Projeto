import { Customer } from '@prisma/client';

export class Order {
  id: number;
  customerId: number; // Nome ajustado para refletir o schema Prisma
  customer: Customer; // Relacionamento com Customer
  items: {
    productId: number; // Nome ajustado para refletir o schema
    quantity: number;
    unitPrice: number;
  }[]; // Array de itens como JSON no schema
  totalPrice: number;
  paymentMethod: string;
  createdAt: Date;
  status: string;

  constructor(
    id: number,
    customerId: number,
    customer: Customer,
    items: {
      productId: number;
      quantity: number;
      unitPrice: number;
    }[],
    totalPrice: number,
    paymentMethod: string,
    createdAt: Date,
    status: string
  ) {
    this.id = id;
    this.customerId = customerId;
    this.customer = customer;
    this.items = items;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt;
    this.status = status;
  }
}
