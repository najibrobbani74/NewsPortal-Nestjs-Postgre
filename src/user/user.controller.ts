import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard1';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    // @UseGuards(JwtAuthGuard)
    @Get()
    getAllUser(){
        return this.userService.findAllUser()
    }

    @Delete(":username")
    deleteUser(@Param() username:string){
        return this.userService.deleteUser(username)
    }
}
