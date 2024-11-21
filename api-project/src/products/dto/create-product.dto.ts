import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product A'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'This is a sample product description.'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product in BRL',
    example: 99.99
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'URL of the product image',
    example: 'http://example.com/product-a.jpg'
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Electronics'
  })
  @IsString()
  category: string;
}
