import { ConfigModule } from '@nestjs/config';
import { getConfig } from './getConfig';
export const configModule = ConfigModule.forRoot({
    envFilePath: ['.env'],
    load: [getConfig],
    isGlobal: true,
});
