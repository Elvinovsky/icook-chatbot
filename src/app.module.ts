// this module should be first line of app.module.ts
import { configModule } from './infrastructure/configuration/config-module';
import { Module } from '@nestjs/common';
import { RecipeGeneratorModule } from './chatgpt/recipe-generator.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
    imports: [configModule, RecipeGeneratorModule, TelegramModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
