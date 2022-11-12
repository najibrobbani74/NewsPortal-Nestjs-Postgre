import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAllUser():Promise<User[]>{
        const result = await this.userRepository.find()
        return result
    }

    async findOneUser(username:string):Promise<User>{
        const result = await this.userRepository.findOne({where:{username}})
        return result
    }

    async createUser(payload:any):Promise<User>{
        const salt = await bcrypt.genSalt()
        payload.password = await bcrypt.hash(payload.password,salt)
        const created = await this.userRepository.save(payload)
        return created
    }
    async updateUser(payload:any):Promise<any>{
        const updated = await this.userRepository.update({username:payload.username},payload)
        return updated
    }
    async updateRefreshToken(payload):Promise<any>{
        const updated = await this.userRepository.update({username:payload.username},{refresh_token:payload.refresh_token})
        console.log(updated)
        return updated;
    }
    async deleteUser(username:string){
        const deleted = await this.userRepository.delete(username)
        if (deleted.affected<1) throw new NotFoundException() 
        return deleted
    }
}
