import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { JwtService } from '@nestjs/jwt';
import { StackRepository } from './stack.repository';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [StackController],
  providers: [StackService, JwtService, StackRepository],
  imports: [
    NestjsFormDataModule.configAsync({
      useFactory: () => ({
        storage: MemoryStoredFile,
      }),
    }),
  ],
})
export class StackModule {}
