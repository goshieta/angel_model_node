import fs from "fs";

// 二次元配列をCSVとして出力する関数
export function exportToCSV(
  data: (number | string)[][],
  filePath: string
): void {
  const csvContent = data.map((row) => row.join(",")).join("\n");
  fs.writeFileSync(filePath, csvContent, "utf-8");
  console.log(`CSV file has been saved to ${filePath}`);
}
