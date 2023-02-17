import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CreateCustomerService } from '../@core/services/create-customer.service';
import { CreateCustomerApplication } from '../@core/applications/create-customer.application';
import { GetCustomerApplication } from '../@core/applications/get-customer.application';
import { UpdateCustomerApplication } from '../@core/applications/update-customer.application';
import { GetCustomerService } from '../@core/services/get-customer.service';
import { UpdateCustomerService } from '../@core/services/update-customer.service';
import { GetCustomerController } from '../@core/controller/get-customer.controller';
import { CreateCustomerController } from '../@core/controller/create-customer.controller';
import { UpdateCustomerController } from '../@core/controller/update-customer.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    CreateCustomerController,
    GetCustomerController,
    UpdateCustomerController,
  ],

  providers: [
    CreateCustomerApplication,
    GetCustomerApplication,
    UpdateCustomerApplication,
    CreateCustomerService,
    GetCustomerService,
    UpdateCustomerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
