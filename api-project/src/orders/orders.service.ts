import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    return this.prismaService.order.create({
      data: createOrderDto
    });
  }

  async findAll(): Promise<any> {
    return this.prismaService.order.findMany();
  }

  async findOne(id: number): Promise<any> {
    return this.prismaService.order.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<any> {
    return this.prismaService.order.update({
      where: { id },
      data: updateOrderDto
    });
  }

  async remove(id: number): Promise<any> {
    return this.prismaService.order.delete({
      where: { id }
    });
  }
}
