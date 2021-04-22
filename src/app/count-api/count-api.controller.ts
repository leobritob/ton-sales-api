import { Controller, Get, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CountApiService } from './count-api.service'

@Controller('api/v1/count-api')
@ApiTags('count-api')
export class CountApiController {
  constructor(private readonly countApiService: CountApiService) {}

  @Post('app/hits')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Hit on App' })
  async newAppHit() {
    return await this.countApiService.newAppHit('app')
  }

  @Get('app/hits')
  @ApiResponse({ status: HttpStatus.OK, description: 'Get the count number of hits on App' })
  async getAppHits() {
    return await this.countApiService.getAppHits('app')
  }
}
