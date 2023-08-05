import { Mode } from './mode.type';

export interface TimeAxisOption {
  mode: Mode;
  scale: number;
  startTime: Date;
  endTime: Date;
}
