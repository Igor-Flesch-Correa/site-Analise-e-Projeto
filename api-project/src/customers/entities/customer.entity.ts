import { Order } from '@prisma/client';

export class Customer {
  id: number;
  cpfCnpj: string;
  password: string;
  name: string;
  email: string;
  orders: Order[];
}
