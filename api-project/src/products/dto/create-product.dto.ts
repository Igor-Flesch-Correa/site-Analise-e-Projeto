import { IsString, IsNumber, MinLength, Min, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product A'
  })
  @IsString()
  @MinLength(1, { message: 'Name cannot be empty' })
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'This is a sample product description.'
  })
  @IsString()
  @MinLength(1, { message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({
    description: 'Price of the product in BRL',
    example: 99.99
  })
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty({
    description: 'URL of the product image',
    example: 'http://example.com/product-a.jpg'
  })
  @IsString()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Electronics'
  })
  @IsString()
  @MinLength(1, { message: 'Category cannot be empty' })
  category: string;
}
