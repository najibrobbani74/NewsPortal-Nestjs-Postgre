import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneUser(username)
        if (user && await bcrypt.compare(password,user.password)) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, id: user.id }
        payload["refresh_token"] = this.jwtService.sign(payload, {
            secret: jwtConstants.secret,
            expiresIn: 60 * 60 * 24 * 30,
        })
        this.userService.updateRefreshToken(payload)
        payload["access_token"] = this.jwtService.sign(payload, {
            secret: jwtConstants.secret,
            expiresIn: 60,
        })
        return payload;
    }

    async signup(payload: CreateUserDto) {
        const user = await this.userService.findOneUser(payload.username)
        if (!user) {
            const registered = await this.userService.createUser(payload);
            delete registered.password;
            registered["refresh_token"] = this.jwtService.sign(payload, {
                secret: jwtConstants.secret,
                expiresIn: 60 * 60 * 24 * 30,
            },)
            registered["access_token"] = this.jwtService.sign(payload, {
                secret: jwtConstants.secret,
                expiresIn: 60,
            })
            return registered;

        }
        throw new ConflictException()
    }

    async updateRefreshToken(user:any){

        return {"access_token":this.jwtService.sign(user, {
            secret: jwtConstants.secret,
            expiresIn: 60,
        })}
    }
}

