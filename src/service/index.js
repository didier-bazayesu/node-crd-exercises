import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../database/data.json");


export async  function readToFIle() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
export async function writeToFile(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}