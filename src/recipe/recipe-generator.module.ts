import { Module } from '@nestjs/common';
import { RecipeGeneratorService } from './recipe-generator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [RecipeGeneratorService],
    exports: [RecipeGeneratorService],
})
export class RecipeGeneratorModule {}
