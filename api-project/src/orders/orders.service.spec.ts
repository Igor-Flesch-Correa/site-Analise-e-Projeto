import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, PrismaService]
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let resultCreate;
  it('should create a order', async () => {
    const createOrderDto = {
      "status": "OPEN",
      "customerId": 9,
      "totalPrice": 10.99,
      "paymentMethod": "pix",
      "items": [
        {
          "productId": 68,
          "quantity": 1,
          "unitPrice": 10.99
        }
      ]
    };
    resultCreate = await service.create(createOrderDto);
    expect(resultCreate).toHaveProperty('id');
  });

  it('should find all orders', async () => {
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result).not.toHaveLength(0);
  });

  it('should find a order by ID', async () => {
    const result = await service.findOne(resultCreate.id);
    expect(result).toHaveProperty('id');
  });

  it('should update a order', async () => {
    const updateOrderDto = {
      "totalPrice": 21.98,
      "paymentMethod": "pix",
      "items": [
        {
          "productId": 68,
          "quantity": 2,
          "unitPrice": 10.99
        }
      ]
    };
    const result = await service.update(resultCreate.id, updateOrderDto);
    expect(result).toHaveProperty('id');
    expect(result.totalPrice).toBe(updateOrderDto.totalPrice);
  });

  // it('should throw error on create with invalid data', async () => {
  //   const createOrderDto = {
  //     "status": "",
  //     "customerId": 9,
  //     "totalPrice": 0,
  //     "paymentMethod": "boleto",
  //     "items": [
  //       {
  //         "productId": 68,
  //         "quantity": 1,
  //         "unitPrice": 10.99
  //       }
  //     ]
  //   };

  //   await expect(service.create(createOrderDto)).rejects.toThrow(
  //     'Invalid input data'
  //   );
  // });

  it('should remove a Order', async () => {
    const result = await service.remove(resultCreate.id);
    expect(result).toHaveProperty('id');
  });

  it('should throw error on remove with non-existent ID', async () => {
    const nonExistentId = 999999;
    await expect(service.remove(nonExistentId)).rejects.toThrow(
      'Order not found'
    );
  });

  it('should throw error on find one with non-existent ID', async () => {
    const nonExistentId = 999999;
    await expect(service.findOne(nonExistentId)).rejects.toThrow(
      'Order not found'
    );
  });

  it('should throw error on remove a non-existent Order', async () => {
    const nonExistentId = 999999;
    await expect(service.remove(nonExistentId)).rejects.toThrow(
      'Order not found'
    );
  });
});
