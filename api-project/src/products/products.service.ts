import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const result = await this.prismaService.product.create({
        data: createProductDto
      });
      return result;
    } catch (error) {
      // Loga o erro completo no console para debug
      console.error('Error creating product:', error);

      if (error.code === 'P2002') {
        // P2002: Chave única violada (por exemplo, nome duplicado)
        throw new HttpException(
          'A product with this unique field already exists.',
          HttpStatus.CONFLICT
        );
      }

      // Lança uma exceção genérica para outros casos
      throw new HttpException(
        'Error creating product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  findAll() {
    const result = this.prismaService.product.findMany();
    return result;
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const result = this.prismaService.product.update({
      where: { id: id },
      data: updateProductDto
    });
    return result;
  }

  async remove(id: number) {
    try {
      const result = await this.prismaService.product.delete({
        where: { id: id }
      });
      return result;
    } catch (error) {
      // Loga o erro completo no console para debug
      console.error('Error deleting product:', error);

      // Lança uma exceção genérica para todos os casos
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
