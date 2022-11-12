import { Injectable } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

@Injectable()
export class CreateNewsDto {
  @IsNotEmpty()
  title:string;
  
  @IsNotEmpty()
  description:string;

  @IsNotEmpty()
  category:string;

  @IsNotEmpty()
  author:string
}