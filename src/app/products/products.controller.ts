import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('api/v1/products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create a new product' })
  async create(@Body() body: CreateProductDto) {
    return await this.productsService.create(body)
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a products list' })
  async findAll() {
    return await this.productsService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a product item' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productsService.findOne(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateProductDto) {
    return await this.productsService.update(id, body)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Product deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productsService.remove(id)
  }
}
