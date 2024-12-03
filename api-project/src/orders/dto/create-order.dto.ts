import {
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class OrderItem {
  @ApiProperty({
    description: 'ID of the product',
    example: 1
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Unit price of the product',
    example: 50.0
  })
  @IsNumber()
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Status of the order (default: OPEN)',
    example: 'OPEN',
    required: false // Opcional
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'ID of the customer placing the order',
    example: 1
  })
  @IsNumber()
  customerId: number;

  @ApiProperty({
    description: 'Total price of the order',
    example: 100.0
  })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({
    description: 'Payment method for the order',
    example: 'credit_card'
  })
  @IsString()
  paymentMethod: string;

  @ApiProperty({
    description: 'List of items in the order',
    example: [
      {
        productId: 1,
        quantity: 2,
        unitPrice: 50.0
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem) // Necessário para validação aninhada
  items: OrderItem[];
}
