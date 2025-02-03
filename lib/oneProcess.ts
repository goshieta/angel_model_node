import { frequency, variables, numberOfPeople } from "..";
import People from "./people";

//一回の天使が通るまでの実験
export function oneProcess(): number {
  let time = 0;
  const classroomX = 7; //(m)
  const classroomY = 9; //(m)
  //初期化
  const peopleList = Array.from(
    { length: numberOfPeople },
    () => new People(Math.random() * classroomX, Math.random() * classroomY)
  );
  while (true) {
    time = (Math.floor(time * 10) + 1) / 10; //timeを0.1増やす。バグを防ぐための実装
    let numberOfTalking = 0;
    peopleList.forEach((onePeople) => {
      //音量の計算を実行
      let max = -100000;
      let min = 100000;
      for (
        let currentTime = time - 1 / frequency;
        currentTime < time;
        currentTime += 1 / (frequency * 10)
      ) {
        const targetX = onePeople.x;
        const targetY = onePeople.y;
        //位相を取得する
        const currentPhase = peopleList.reduce(
          (previousValue, onePeople) =>
            (previousValue += onePeople.getPhase(
              targetX,
              targetY,
              currentTime
            )),
          0
        );
        if (currentPhase > max) max = currentPhase;
        if (currentPhase < min) min = currentPhase;
      }
      const volume = (max - min) / 2;

      numberOfTalking += onePeople.process(volume, time) ? 1 : 0;
    });
    if (numberOfTalking <= variables.judgeNumberOfPeople) {
      break;
    }
  }
  return time;
}
