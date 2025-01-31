import { oneProcess } from "./lib/oneProcess";

export const temp = 20;
export const speedOfSound = 331.5 + 0.6 * temp;
export const frequency = 1000; //一般的な女性の声の周波数
export const probabilityOfSpeak = 0.5; //しゃべる確率
export const thresholdOfVolume = 2; //黙る音量のしきい値

function main() {
  let total = 0; //天使が通った秒数の合計
  const cycleTime = 5000;
  console.time();
  for (let i = 0; i < cycleTime; i++) {
    process.stdout.write(`\r現在の回数: ${i + 1}/${cycleTime}`);
    total += oneProcess();
  }
  process.stdout.write("\n");
  console.timeEnd();
  console.log("期待値は" + total / cycleTime + `です`);
}

main();
