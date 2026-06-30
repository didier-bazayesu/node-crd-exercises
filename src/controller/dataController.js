import { trace } from "console";
import fs from "fs/promises";
import path from "path";
import { json } from "stream/consumers";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../database/data.json");

async function readFile() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
async function writeToFile(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getAll(__, res) {
  try {
    const data = await readFile();
    if (!data)
      return res.status(500).json({ message: "error in reading file" });
    return res.status(200).json(data);
  } catch (erro) {
    res.status(200).json({ message: erro.message });
  }
}

export async function getById(req, res) {
  try {
     const { id } = req.params;
    const data = await readFile();
    const exsistData = data.filter((data) => data.id === Number(id));
    if(exsistData.length === 0) return res.status(404).json({message: "not data of thi id  found!"})
    return res.status(200).json(exsistData)

  } catch (erro) {
    res.status(200).json({ message: erro.message });
  }
}

export async function createData(req, res) {
  try {
    const existData = await readFile();
    const { id, name, email, address } = req.body;
    if (existData.find((data) => data.id === Number(id)))
      return res
        .status(400)
        .json({ message: "id of this user  already exsist" });
    if (!id) return res.status(400).json({ message: "id is required" });
    if (!name) return res.status(400).json({ message: "name is required" });
    if (!email) return res.status(400).json({ message: "email is required" });
    if (!address)
      return res.status(400).json({ message: "address is required" });
    const newData = { id, name, email, address };
    existData.push(newData);
    await writeToFile(existData);
    return res.status(201).json({ message: "User created", data: existData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateData(req, res) {
  try {
    const { id } = req.params;
    const newData = req.body;
    if (!id) return res.status(500).json({ message: "no id provided" });
    const data = await readFile();
    const exsistUser = data.find(data => data.id === Number(id))
    Object.assign(exsistUser,newData);
    await writeToFile(data)
    return res.status(200).json({message: "data updated", data: exsistUser}) 
  } catch (err) {
     res.status(500).json({ message: err.message });
  }
}

export  async function DeleteData(req , res){
     try {
    const { id } = req.params;
    const data = await readFile();
    const exsistData = data.filter((data) => data.id === Number(id));
    if(exsistData.length === 0) return res.status(404).json({message: "not data of thi id  found!"})
    const indexOfDelete = data.findIndex(data => data.id === Number(id));
    data.splice(indexOfDelete,1)
    await writeToFile(data)
    return res.status(200).json({message: "data deleted", exsistData})
    
  } catch (erro) {
    res.status(200).json({ message: erro.message });
  }


}
