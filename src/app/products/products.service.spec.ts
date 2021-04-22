import { Test, TestingModule } from '@nestjs/testing'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { ProductsService } from './products.service'

describe('ProductsService', () => {
  let productsService: ProductsService
  let dynamoDBHelper: DynamoDBHelper

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: DynamoDBHelper,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateItem: jest.fn(),
            deleteItem: jest.fn(),
          },
        },
      ],
    }).compile()

    productsService = module.get<ProductsService>(ProductsService)
    dynamoDBHelper = module.get<DynamoDBHelper>(DynamoDBHelper)
  })

  it('should be defined', () => {
    expect(productsService).toBeDefined()
    expect(dynamoDBHelper).toBeDefined()
  })
})
