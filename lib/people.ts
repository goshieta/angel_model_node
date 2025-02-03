import { speedOfSound, frequency, variables } from "..";

export default class People {
  name: string;
  x: number;
  y: number;
  private talkingArray: boolean[];
  private timeing: number;

  peopleDelayinfo: { [key: string]: number } = {};

  constructor(x: number, y: number) {
    this.name = crypto.randomUUID();
    this.talkingArray = [Math.random() < variables.probabilityOfSpeak];
    this.x = x;
    this.y = y;
    this.timeing = Math.random();
  }

  //人の配列を渡すことで、遅れを登録する
  submitDelay(peoples: People[]) {
    peoples.forEach(
      (people) =>
        (this.peopleDelayinfo[people.name] = this.getDelay(people.x, people.y))
    );
  }

  //時間からその時に喋っていたのか算出
  isTalkingThisTime(time: number) {
    return this.talkingArray[Math.floor(time)];
  }

  // 時間と座標からこの人の出している音声の位相を返す
  getPhase(x: number, y: number, time: number) {
    const delay = this.getDelay(x, y);
    const baseTime = time - delay;

    return this.getPhaseByTime(baseTime);
  }

  //座標から音波が届くまでの時間を返す
  getDelay(x: number, y: number) {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    const delay = distance / speedOfSound;
    return delay;
  }

  //時間からこの人の出している音声の位相を返す
  getPhaseByTime(time: number) {
    if (this.isTalkingThisTime(time)) {
      //喋っていた場合
      return Math.sin((time * frequency + this.timeing) * Math.PI);
    } else {
      //黙っていた場合
      return 0;
    }
  }

  process(volume: number, time: number): boolean {
    this.talkingArray[time] = Math.random() < variables.probabilityOfSpeak;
    if (volume < variables.thresholdOfVolume) {
      this.talkingArray[time] = false;
    }
    return this.talkingArray[time];
  }
}
