import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Validação manual
    if (!createProductDto.name || createProductDto.name.trim() === '') {
      throw new HttpException('Name cannot be empty', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.prismaService.product.create({
        data: createProductDto
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma: Violação de restrição única
        throw new HttpException(
          'Product with the same name already exists',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async findAll(page: number, limit: number, category?: string) {
    const offset = (page - 1) * limit; // Calcula o deslocamento para a paginação

    const where = category ? { category } : {}; // Adiciona filtro por categoria, se fornecido

    const products = await this.prismaService.product.findMany({
      where,
      skip: offset,
      take: +limit
    });

    const totalCount = await this.prismaService.product.count({ where }); // Total de itens para paginação

    return {
      data: products,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    };
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (!updateProductDto.name || updateProductDto.name.trim() === '') {
      throw new HttpException('Name cannot be empty', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.prismaService.product.update({
        where: { id },
        data: updateProductDto
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.product.delete({
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // Erro do Prisma: Registro não encontrado
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
