import { EButtonTypes } from '../enum/buttonTypes.enum';
import { EAudioEffectType } from '../types/types';

export class UserInputDto {
  number: number;
  type: EButtonTypes;
  name: string;
  code: string;
}

export class WinnerDto {
  username: string;
  code: string;
}

export class ButtonSelectDto {
  type: EButtonTypes;
  code: string;
}

export class ShareEmojiDto {
  emoji: string;
  code: string;
}

export class JoinRoomDto {
  name: string;
}

export class ShareAudioEffectDto {
  name: EAudioEffectType;
  code: string;
}

export class PlayerLeftOrJoinDto {
  name: string;
  code: string;
}

export class PageRefreshDto {
  name: string;
  code: string;
}
