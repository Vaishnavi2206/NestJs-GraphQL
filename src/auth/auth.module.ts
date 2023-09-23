import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports:[PassportModule,UsersModule],
  providers: [AuthResolver, AuthService, LocalStrategy]
})
export class AuthModule {}
