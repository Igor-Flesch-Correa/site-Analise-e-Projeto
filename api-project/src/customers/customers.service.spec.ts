import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, PrismaService]
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let resultCreate;
  it('should create a customer', async () => {
    const createCustomerDto = {
      cpfCnpj: '68418415061',
      password: 'securepassword123',
      name: 'Joao Feijao',
      email: 'john.doe@example.com',
      addresses: [
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
    };
    resultCreate = await service.create(createCustomerDto);
    expect(resultCreate).toHaveProperty('id');
  });

  it('should find all customer', async () => {
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result).not.toHaveLength(0);
  });

  it('should find a customer by ID', async () => {
    const result = await service.findOne(resultCreate.id);
    expect(result).toHaveProperty('id');
  });

  it('should update a customer', async () => {
    const updateCustomerDto = { name: 'João Calabreso' };
    const result = await service.update(resultCreate.id, updateCustomerDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(updateCustomerDto.name);
  });

  // it('should throw error on create with invalid data', async () => {
  //   const createCustomerDto = {
  //     cpfCnpj: '',
  //     password: '',
  //     name: 'Joao Feijao',
  //     email: 'john.doe@example.com',
  //     addresses: [
  //       {
  //         address: '123 Main St',
  //         number: '101',
  //         complement: 'Apt 4'
  //       },
  //       {
  //         address: '456 Second Ave',
  //         number: '202',
  //         complement: 'Suite B'
  //       }
  //     ]
  //   };

  //   await expect(service.create(createCustomerDto)).rejects.toThrow(
  //     'Name cannot be empty'
  //   );
  // });

  // it('should remove a customer', async () => {
  //   const result = await service.remove(resultCreate.id);
  //   expect(result).toHaveProperty('id');
  // });
});
