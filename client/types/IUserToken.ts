import { IUser } from "./IUser";

export interface IUserToken {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
