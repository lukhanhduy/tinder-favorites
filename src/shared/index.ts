import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestContext } from './modules/context';
import { User, UserSchema, File, FileSchema} from './schemas';
@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        },
        {
            name: File.name,
            schema: FileSchema
        }]),
    ],
    providers: [RequestContext],
    exports: [RequestContext],
})
export class SharedModule { }
