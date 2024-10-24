import { IUser } from "./user.interface";

export interface IAuthResponse {
    access_token: string;
    authorities: string;
    user: any;
}