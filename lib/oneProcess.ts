import { frequency, variables } from "..";
import People from "./people";

//一回の天使が通るまでの実験
export function oneProcess(): number {
  let time = 0;
  const classroomX = 7; //(m)
  const classroomY = 9; //(m)
  //初期化
  const peopleList = Array.from(
    { length: variables.numberOfPeople },
    () => new People(Math.random() * classroomX, Math.random() * classroomY)
  );
  peopleList.forEach((onePeople) => onePeople.submitDelay(peopleList));
  while (true) {
    time = time + 1;
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
        //位相を取得する
        const currentPhase = peopleList.reduce(
          (previousValue, targetPeople) => {
            if (onePeople.name === targetPeople.name) return previousValue;
            return (previousValue += targetPeople.getPhaseByTime(
              currentTime - targetPeople.peopleDelayinfo[onePeople.name]
            ));
          },
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
