import { Module } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Module({
    imports: [],
    providers: [ChatgptService],
})
export class ChatgptModule {}
