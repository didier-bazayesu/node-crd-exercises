import { validationResult } from "express-validator";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const filePath = path.join(path.dirname(__filename), "../database/data.json");
 async  function readToFIle() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
 async function writeToFile(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function deleteByIdService (id){
  const data = await readToFile();
  const indexOfDelete = data.findIndex(data => data.id === Number(id));
  if(indexOfDelete === -1) return false;
  const deletedData = data[indexOfDelete];
  data.splice(indexOfDelete, 1);
  await writeToFile(data);
  return deletedData;
}

export async function createDataService (data){
     const existData = await readToFile();
       if (existData.find(d => d.id === Number(data.id))) {
    throw new Error("ID already exists");
  }
   
    const newUser = { ...data, id: Number(data.id) };
  existData.push(newUser);
  await writeToFile(existData);

  return newUser;

}

export async function getAllService() {
  const data = await readToFIle();
    return data;
}

export async function getByIdService(id) {
  const data = await readToFIle();
  const exsistData = data.filter((data) => data.id === Number(id));
  if(exsistData.length === 0) throw new Error("no data")
  return exsistData;
}

export async function updateDataService(id, newData) {
  const data = await readToFIle();
  const indexOfUpdate = data.findIndex((data)=> data.id === Number(id))
  if(indexOfUpdate === -1) throw new Error("no data")
  if(newData.id) throw new Error("you are not allowed to update the id")
  Object.assign(data[indexOfUpdate], newData);
  await writeToFile(data);
  return data[indexOfUpdate];

}