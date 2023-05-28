import { JwtModuleOptions } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';

//config

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get('SECRET'),
});
