import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { getConfig } from '../infrastructure/configuration/getConfig';

@Module({
    imports: [TelegrafModule.forRoot(getConfig().TELEGRAM_TOKEN)],
    providers: [TelegramService],
})
export class TelegramModule {}
