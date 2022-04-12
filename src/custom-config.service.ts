import { Inject, Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { model, Schema, connect, connection } from 'mongoose';

@Injectable()
export class CustomConfigService implements OnApplicationBootstrap {

    async onApplicationBootstrap() {
    
    }
}
