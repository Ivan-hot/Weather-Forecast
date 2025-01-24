import { Module } from '@nestjs/common';
//import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('POSTGRESQL_PORT'),
        username: configService.get<string>('POSTGRESQL_USERNAME'),
        password: configService.get<string>('POSTGRESQL_PASSWORD'),
        database: configService.get<string>('POSTGRESQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true, // false когда ПРОД
        // logging: configService.get<string>('config.nodenv') === 'development',
        logging: ['query', 'error', 'warn'], // Логировать SQL-запросы и ошибки
        migrationsRun: true,
        migrationsTableName: 'migrations',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    //UsersModule,
    //MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
