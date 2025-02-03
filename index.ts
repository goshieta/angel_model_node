import { oneProcess } from "./lib/oneProcess";
import { exportToCSV } from "./lib/outAsCSV";

//定数
export const temp = 20;
export const speedOfSound = 331.5 + 0.6 * temp;
export const frequency = 1000; //一般的な女性の声の周波数
export const cycleTime = 100;

//変数
export const variables = {
  judgeNumberOfPeople: 0,
  thresholdOfVolume: 0.1,
  probabilityOfSpeak: 0.5,
  numberOfPeople: 40,
};

function main() {
  let data: [number[], number[]] = [[], []];

  const variable = "numberOfPeople";
  const initial = 10;
  const end = 11;
  const step = 1;

  for (
    variables[variable] = initial;
    variables[variable] < end;
    variables[variable] += step
  ) {
    let total = 0; //天使が通った秒数の合計
    console.time();
    for (let i = 0; i < cycleTime; i++) {
      process.stdout.write(
        `\r${variable}=${variables[variable]} - 現在の回数: ${
          i + 1
        }/${cycleTime}`
      );
      total += oneProcess();
    }
    process.stdout.write("\n");
    console.timeEnd();
    console.log("期待値は" + total / cycleTime + `です`);
    data[0].push(variables[variable]);
    data[1].push(total / cycleTime);
  }

  console.log(data);
  exportToCSV(data, `./out/data_x_${variable}.csv`);
}

main();
