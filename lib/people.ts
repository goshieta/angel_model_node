import { speedOfSound, frequency, variables } from "..";

export default class People {
  name: string;
  x: number;
  y: number;
  private talkingArray: boolean[];
  private timeing: number;

  constructor(x: number, y: number) {
    this.name = crypto.randomUUID();
    this.talkingArray = [Math.random() < variables.probabilityOfSpeak];
    this.x = x;
    this.y = y;
    this.timeing = Math.random();
  }

  //時間からその時に喋っていたのか算出
  isTalkingThisTime(time: number) {
    return this.talkingArray[Math.floor(time * 10)];
  }

  // 時間と座標からこの人の出している音声の位相を返す
  getPhase(x: number, y: number, time: number) {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    const delay = distance / speedOfSound;
    const baseTime = time - delay;

    if (this.isTalkingThisTime(baseTime)) {
      //喋っていた場合
      return Math.sin((baseTime * frequency + this.timeing) * Math.PI);
    } else {
      //黙っていた場合
      return 0;
    }
  }

  process(volume: number, time: number): boolean {
    const intTime = time * 10;
    this.talkingArray[intTime] = Math.random() < variables.probabilityOfSpeak;
    if (volume < variables.thresholdOfVolume) {
      this.talkingArray[intTime] = false;
    }
    return this.talkingArray[intTime];
  }
}
