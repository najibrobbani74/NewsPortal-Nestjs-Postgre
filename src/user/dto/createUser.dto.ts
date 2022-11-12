import { Injectable } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

@Injectable()
export class CreateUserDto {
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;
}