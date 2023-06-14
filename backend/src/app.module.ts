import {Module} from "@nestjs/common";
import {SequelizeModule} from '@nestjs/sequelize'
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import * as path from "path";
import {TrackModule} from "./track/track.module";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        TrackModule,
        FileModule,
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    ]
})
export class AppModule {}