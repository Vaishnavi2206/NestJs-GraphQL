import { Module } from '@nestjs/common';
// import { AppController } from './app.resolver';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    // AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // include: [UsersModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
      sortSchema: true,
    }),
    AuthModule,
  ],
  // controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
