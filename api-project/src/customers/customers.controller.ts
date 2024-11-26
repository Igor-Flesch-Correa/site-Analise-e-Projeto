import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Customers') // Agrupa as rotas sob a categoria "Customers" no Swagger
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' }) // Descrição do endpoint
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a customer by CPF and password' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Invalid CPF or password' })
  async authenticate(@Body() body: { cpfCnpj: string; password: string }) {
    return await this.customersService.authenticate(
      body.cpfCnpj,
      body.password
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' }) // Descrição do endpoint
  @ApiResponse({
    status: 200,
    description: 'List of customers retrieved successfully'
  })
  async findAll() {
    return await this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return await this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.customersService.remove(id);
    return { message: 'Customer deleted successfully' };
  }
}
