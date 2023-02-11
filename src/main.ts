import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { AllExceptionsFilter } from './core/filter/any-exception/any-exception.filter';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // 设置全局路由前缀
  app.setGlobalPrefix('api');
  app.useStaticAssets('public');

  // 使用全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 使用全局过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // 使用全局管道
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 使用中间件; 监听所有的请求路由，并打印日志
  app.use(new LoggerMiddleware().use);

  // swagger配置
  const config = new DocumentBuilder()
    .setTitle('Meet')
    .setDescription('Meet Api')
    .setVersion('V1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
