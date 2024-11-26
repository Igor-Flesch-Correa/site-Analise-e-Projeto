import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customerId, items, ...rest } = createOrderDto;

    try {
      return await this.prismaService.order.create({
        data: {
          ...rest,
          customer: {
            connect: { id: customerId } // Relaciona ao cliente
          },
          items: JSON.stringify(items), // Converte os itens para JSON
          status: rest.status || 'OPEN' // Define status padrão
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error creating order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findByUserId(userId: number) {
    const orders = await this.prismaService.order.findMany({
      where: { customerId: userId }
    });

    if (orders.length === 0) {
      throw new NotFoundException('No orders found for this user');
    }

    return orders;
  }

  async findAll(): Promise<any> {
    try {
      return await this.prismaService.order.findMany({
        include: {
          customer: true // Inclui informações do cliente relacionado
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new HttpException(
        'Error fetching orders',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<any> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        customer: true
      }
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
      const { customerId, items, ...rest } = updateOrderDto;

      return await this.prismaService.order.update({
        where: { id },
        data: {
          ...rest,
          ...(customerId && {
            customer: {
              connect: { id: customerId }
            }
          }),
          ...(items && { items: JSON.stringify(items) }) // Converte os itens para JSON se fornecidos
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error updating order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      return await this.prismaService.order.delete({
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error deleting order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
