// this module should be first line of app.module.ts
import { configModule } from './infrastructure/configuration/config-module';
import { Module } from '@nestjs/common';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
    imports: [configModule, ChatgptModule, TelegramModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
