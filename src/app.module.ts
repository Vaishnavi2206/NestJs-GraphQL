import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MessagesModule } from './messages/messages.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      subscriptions:{
        'subscriptions-transport-ws':{
          path:'/graphql'
        }
      },
    }),
    AuthModule,
    MessagesModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: "redis://localhost:6379",
      // host: process.env.REDIS_HOST || 'localhost',
      // port: process.env.REDIS_PORT || 6379
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule { }
