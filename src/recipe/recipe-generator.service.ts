import { Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '../infrastructure/configuration/getConfig';
import { ConfigService } from '@nestjs/config';
import { catchError, map, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RecipeGeneratorService {
    private readonly logger: Logger = new Logger(RecipeGeneratorService.name);
    private readonly gptUrl: string;

    constructor(private readonly configService: ConfigService<ConfigType>, private readonly httpService: HttpService) {
        this.gptUrl = 'https://generatom.com/ajax/recipes';
    }

    async generateResponse(content: string) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const requestBody = `keywords=${content}`;

        return this.httpService.post(this.gptUrl, requestBody, { headers }).pipe(
            map(({ data }) => data.text),
            catchError((err) => {
                this.logger.error(err);
                return of('Произошла ошибка');
            }),
        );
    }
}
