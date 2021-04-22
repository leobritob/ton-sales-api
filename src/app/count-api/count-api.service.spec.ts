import { HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { CountApiService } from './count-api.service'

describe('CountApiService', () => {
  let countApiService: CountApiService
  let httpService: HttpService
  let dynamoDBHelper: DynamoDBHelper

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: DynamoDBHelper,
          useValue: {
            findOne: jest.fn(),
            updateItem: jest.fn(),
          },
        },
      ],
    }).compile()

    countApiService = module.get<CountApiService>(CountApiService)
    httpService = module.get<HttpService>(HttpService)
    dynamoDBHelper = module.get<DynamoDBHelper>(DynamoDBHelper)
  })

  it('should be defined', () => {
    expect(countApiService).toBeDefined()
    expect(httpService).toBeDefined()
    expect(dynamoDBHelper).toBeDefined()
  })
})
