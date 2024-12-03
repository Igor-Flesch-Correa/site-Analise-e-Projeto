import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCpfOrCnpj } from './is-cpf-or-cnpj.decorator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  address: string;

  @IsString()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;
}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'CPF or CNPJ of the customer',
    example: '12345678900' // Exemplo para CPF
  })
  @IsString()
  @IsCpfOrCnpj({ message: 'Invalid CPF or CNPJ' }) // Validação customizada
  cpfCnpj: string;

  @ApiProperty({
    description: 'Password for the customer account',
    example: 'securepassword123'
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Full name of the customer',
    example: 'John Doe'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'john.doe@example.com'
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'List of addresses associated with the customer',
    example: [
      {
        address: '123 Main St',
        number: '101',
        complement: 'Apt 4'
      },
      {
        address: '456 Second Ave',
        number: '202',
        complement: 'Suite B'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}
