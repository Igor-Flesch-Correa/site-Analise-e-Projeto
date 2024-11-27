import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { addresses, ...customerData } = createCustomerDto;

    try {
      return await this.prismaService.customer.create({
        data: {
          ...customerData,
          addresses: {
            create: addresses // Cria os endereços associados ao cliente
          }
        },
        include: {
          addresses: true // Inclui os endereços na resposta
        }
      });
    } catch (error) {
      console.error('Error creating customer:', error);

      if (error.code === 'P2002') {
        // Prisma: Violação de restrição única (e.g., CPF ou email duplicado)
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

  async authenticate(cpfCnpj: string, password: string) {
    const customer = await this.prismaService.customer.findUnique({
      where: { cpfCnpj }
    });

    if (!customer || customer.password !== password) {
      throw new UnauthorizedException('Invalid CPF or password');
    }

    return { id: customer.id };
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
    const { addresses, ...customerData } = updateCustomerDto;

    try {
      return await this.prismaService.customer.update({
        where: { id },
        data: {
          ...customerData,
          addresses: addresses
            ? {
                upsert: addresses.map((address) => ({
                  where: { id: address.id || 0 }, // Assume que cada endereço tem um ID
                  update: {
                    address: address.address,
                    number: address.number,
                    complement: address.complement
                  },
                  create: {
                    address: address.address,
                    number: address.number,
                    complement: address.complement
                  }
                }))
              }
            : undefined
        },
        include: {
          addresses: true // Inclui os endereços atualizados na resposta
        }
      });
    } catch (error) {
      console.error('Error updating customer:', error);

      if (error.code === 'P2025') {
        // Prisma: Registro não encontrado
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
