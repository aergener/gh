import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Grasshopper')
    .setVersion('0.0.1')
    .addTag('Users', 'Users of Grasshopper Bank')
    .addTag('Transactions', 'Transactions made at the bank')
    .addTag('User Transaction Summaries', 'User aggregate transaction information')
    .addTag('Violations', 'Transaction violations committed by users')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
