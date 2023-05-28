import { Exclude } from 'class-transformer';

export class BaseDto {
  @Exclude()
  public unknownField: any;
}
