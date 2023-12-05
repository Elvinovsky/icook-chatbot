import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../infrastructure/configuration/getConfig';
import { RecipeGeneratorService } from '../chatgpt/recipe-generator.service';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
    constructor(
        private configService: ConfigService<ConfigType>,
        private readonly recipeGenerator: RecipeGeneratorService,
    ) {
        super(configService.get('TELEGRAM_TOKEN', { infer: true }));
    }

    @Start()
    onStart(@Ctx() ctx: Context) {
        ctx.replyWithHTML(
            `<b>Привет, ${ctx.from.first_name}! 🍻</b> Я - твой ассистент-повар! 🍳 Давай-ка сделаем что-то веселенькое из того, что у тебя в холодильнике. Просто кинь мне ингредиенты через пробел или запятую. 🥦🍅 Поехали, готовить вместе! 🍽️😜`,
        ).then((r) => r.text);
    }

    @On('text')
    async onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
        const waitMessage = await ctx.reply('Подождите, идет обработка вашего запроса...🕑');

        const observablePromise = this.recipeGenerator.generateResponse(message);

        // Используем оператор 'await' для ожидания разрешения Promise
        const observable = await observablePromise;

        // Используем оператор 'subscribe' для подписки на Observable
        observable.subscribe((response: string) => {
            ctx.telegram.editMessageText(ctx.chat.id, waitMessage.message_id, undefined, response);
        });
    }
}
