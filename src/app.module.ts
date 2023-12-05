// this module should be first line of app.module.ts
import { configModule } from './infrastructure/configuration/config-module';
import { Module } from '@nestjs/common';
import { RecipeGeneratorModule } from './recipe/recipe-generator.module';
import { TelegramModule } from './telegram/telegram.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [configModule, RecipeGeneratorModule, TelegramModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
