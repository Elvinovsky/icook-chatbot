import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { getConfig } from '../infrastructure/configuration/getConfig';
import { RecipeGeneratorModule } from '../recipe/recipe-generator.module';

@Module({
    imports: [TelegrafModule.forRoot(getConfig().TELEGRAM_TOKEN), RecipeGeneratorModule],
    providers: [TelegramService],
})
export class TelegramModule {}
