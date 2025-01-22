import People from "./lib/people";

function one_tenshi() {
  let time = 0;
  const people_list = Array.from({ length: 40 }, () => new People());
  let volume = people_list.reduce(
    (previousValue, person) => (previousValue += person.isTalking ? 1 : 0),
    0
  );
  let next_volume = 0;
  let first_time_passing_angel = 0;
  while (true) {
    time += 1;
    for (let i = 0; i < 40; i++) {
      let is_taling = people_list[i].process(volume);
      next_volume += Number(is_taling);
    }
    volume = next_volume;
    next_volume = 0;
    if (volume == 0) {
      first_time_passing_angel = time;
      break;
    }
  }
  return first_time_passing_angel;
}

function main() {
  let total = 0;
  const cycleTime = 5000;
  console.time();
  for (let i = 0; i < cycleTime; i++) {
    process.stdout.write(`\r現在の回数: ${i + 1}/${cycleTime}`);
    total += one_tenshi();
  }
  process.stdout.write("\n");
  console.timeEnd();
  console.log("期待値は" + total / cycleTime + `です`);
}

main();
