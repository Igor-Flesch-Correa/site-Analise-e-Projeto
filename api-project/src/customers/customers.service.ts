import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.prismaService.customer.create({
        data: createCustomerDto
      });
    } catch (error) {
      console.error('Error creating customer:', error);

      if (error.code === 'P2002') {
        throw new HttpException(
          'Customer with this unique field already exists',
          HttpStatus.CONFLICT
        );
      }

      throw new HttpException(
        'Failed to create customer',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaService.customer.findMany();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw new HttpException(
        'Failed to fetch customers',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id }
    });

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.prismaService.customer.update({
        where: { id },
        data: updateCustomerDto
      });
    } catch (error) {
      console.error('Error updating customer:', error);

      if (error.code === 'P2025') {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to update customer',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.customer.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting customer:', error);

      if (error.code === 'P2025') {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to delete customer',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
