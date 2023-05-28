import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { StackModule } from './stack/stack.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, FileModule, UserModule, ProjectModule, StackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
