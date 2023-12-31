import * as process from 'process';
import { TelegrafModuleOptions } from 'nestjs-telegraf';

export const getConfig = () => ({
    TELEGRAM_TOKEN: { token: process.env.TELEGRAM_API_KEY },
});

export type ConfigType = ReturnType<typeof getConfig>;
