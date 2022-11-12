import { Controller, Post, UseGuards , Request, Get, Body, HttpCode, Res} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard1';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post("signup")
    async signup(@Body() payload:CreateUserDto){
        return this.authService.signup(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get("refresh-token")
    async updateRefreshToken(@Request() req){
        return this.authService.updateRefreshToken(req.user)
    }

}
