import { EButtonTypes } from '../enum/buttonTypes.enum';

export interface IDataType {
  number: number;
  type: EButtonTypes;
  name: string;
}

export enum EAudioEffectType {
  HAHA_EFFECT = 'HAHA_EFFECT',
  BOO_EFFECT = 'BOO_EFFECT',
  YAY_EFFECT = 'YAY_EFFECT',
  COOL_EFFECT = 'COOL_EFFECT',
  HMM_EFFECT = 'HMM_EFFECT',
  GOOD_EFFECT = 'GOOD_EFFECT',
}
