import * as fs from "node:fs/promises";
import * as path from "node:path"
const BASE_PATH=process.cwd();


const saveDB=async(todoList,save)=>{
  try {
    const dataJson=JSON.stringify(todoList);
    const pathInitial=path.join(BASE_PATH,save);
    await fs.writeFile(pathInitial,dataJson,{encoding:"utf-8"});
    console.log("datos guardados exitosamente")
  } catch (err) {
    console.log(err)
    throw new Error("error al guardar datos")
  }
}
const loadDB = async (filePath) => {
  try {
    const pathInitial = path.join(BASE_PATH, filePath);
    const data = await fs.readFile(pathInitial, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};

export{
  saveDB,
  loadDB
}