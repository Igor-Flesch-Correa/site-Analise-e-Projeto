import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpException } from '@nestjs/common/exceptions';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
  });

  let resultCreate;
  it('should create product', async () => {
    const createProductDto = {
      name: 'Xis salada',
      description: 'Delicioso e grande',
      price: 10.99,
      imageUrl: 'https://as2.ftcdn.net/v2/jpg/03/58/43/37/1000_F_358433703_UpOu6jBsp7F9ATErl4oza40kJDlw3JcO.jpg',
      category: 'Lanche'
    };
    resultCreate = await service.create(createProductDto);
    expect(resultCreate).toHaveProperty('id');
  });

  it('should find all products', async () => {
    const result = await service.findAll(1, 10);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('total');
  });

  it('should find one product', async () => {
    const result = await service.findOne(resultCreate.id);
    expect(result).toHaveProperty('id');
  });

  it('should update product', async () => {
    const updateProductDto = { name: 'Xis carne' };
    const result = await service.update(resultCreate.id, updateProductDto);
    expect(result).toHaveProperty('id');
  });

  it('should remove product', async () => {
    const result = await service.remove(resultCreate.id);
    expect(result).toHaveProperty('id');
  });
  
  it('should throw error on remove with non-existent ID', async () => {
    const nonExistentId = 999999;
    await expect(service.remove(nonExistentId)).rejects.toThrow(HttpException);
  });
 
  it('should find products by category', async () => {
    const category = 'Lanche';
    const result = await service.findAll(1, 10, category);
    expect(result.data).toEqual(expect.arrayContaining([expect.objectContaining({ category })]));
  });
  
  it('should throw error on find one with non-existent ID', async () => {
    const nonExistentId = 999999;
    await expect(service.findOne(nonExistentId)).rejects.toThrow(HttpException);
  });


  it('should throw an error when trying to delete a product with a non-existent id', async () => {
    await expect(service.remove(1)).rejects.toThrow(HttpException);
  });
});
