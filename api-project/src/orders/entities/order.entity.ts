import { Customer } from '@prisma/client';

export class Order {
  id: number;
  clienteId: number;
  costumer: Customer;
  items: {
    id: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  createdAt: Date;
  status: string;

  constructor(
    id: number,
    clienteId: number,
    customer: Customer,
    items: {
      id: number;
      produtoId: number;
      quantidade: number;
      precoUnitario: number;
    }[],
    totalPrice: number,
    paymentMethod: string,
    createdAt: Date,
    status: string
  ) {
    this.id = id;
    this.clienteId = clienteId;
    this.customer = customer;
    this.items = items;
    this.totalPrice = totalPrice;
    this.createdAt = createdAt;
    this.paymentMethod = paymentMethod;
    this.status = status;
  }
}
