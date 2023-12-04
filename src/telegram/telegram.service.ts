import { Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

type Context = Scenes.SceneContext;
@Update()
export class TelegramService extends Telegraf<Context> {}
