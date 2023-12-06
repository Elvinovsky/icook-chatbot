import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../infrastructure/configuration/getConfig';
import { RecipeGeneratorService } from '../recipe/recipe-generator.service';

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
    async onStart(@Ctx() ctx: Context) {
        const botInfo = await ctx.telegram.getMe();
        console.log('Bot info:', botInfo);

        ctx.replyWithHTML(
            `<b>Привет, ${ctx.from.first_name}! 🍻</b> Я - твой ассистент-повар! 🍳 Давай-ка сделаем что-то веселенькое из того, что у тебя в холодильнике. Просто кинь мне ингредиенты через пробел или запятую. 🥦🍅 Поехали, готовить вместе! 🍽️😜`,
        ).then((r) => r.text);
    }

    @On('text')
    async onMessage(@Message() msg: any, @Ctx() ctx: Context) {
        if (msg && msg.text) {
            const waitMessage = await ctx.reply('Подождите, идет обработка вашего запроса...🕑');

            try {
                const observablePromise = this.recipeGenerator.generateResponse(msg.text);
                const observable = await observablePromise;

                observable.subscribe((response: string) => {
                    ctx.telegram.editMessageText(ctx.chat.id, waitMessage.message_id, undefined, response);
                });
            } catch (error) {
                console.error(error);
                await ctx.reply('Произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз.');
            }
        }
    }
}
