import {
  IsNumber,
  IsDate,
  IsString,
  IsArray,
  ValidateNested,
  IsObject
} from 'class-validator';

class OrderItem {
  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  precoUnitario: number;
}

export class CreateOrderDto {
  @IsNumber()
  clienteId: number;

  @IsDate()
  dataCriacao: Date;

  @IsDate()
  dataEntrega: Date;

  @IsString()
  status: string;

  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @IsObject({ each: true })
  itens: OrderItem[];
}
