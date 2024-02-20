import { SetMetadata } from '@nestjs/common';

export const BotOnly = () => SetMetadata('botOnly', true);
