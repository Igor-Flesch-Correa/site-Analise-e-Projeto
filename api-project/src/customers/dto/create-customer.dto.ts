import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCpfOrCnpj } from './is-cpf-or-cnpj.decorator';

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
}
