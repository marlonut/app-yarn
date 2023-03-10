import { loadDB, saveDB } from "./list-db-methods.js";
import chalk from "chalk";
const SAVE_DATA="db/data.json"
let todoList=[];

const loadTodoList=async()=>{
  try {
    todoList = await loadDB(SAVE_DATA);
    console.log("Datos cargados exitosamente");
  } catch (error) {
    todoList=[];
  }
}


const crear=({description})=>{
  const todo={
    description,
    isComplete:false
  }  
  
  return todo
}

const addTodoList=(newListTodo)=>{
  todoList=newListTodo
  saveDB(todoList,SAVE_DATA)
  return true
}
const updateTodoList=(todoListen=[],description,completed)=>{
  const todoIndex=todoListen.findIndex(todo=>todo.description===description);
  if(todoIndex>=0){
    todoListen[todoIndex].isComplete=completed
    saveDB(todoListen,SAVE_DATA)
  }else{
    throw new Error("dato no existente")
  }
}
const getTodoList=()=>{
  const todoClone=structuredClone(todoList);
  return todoClone
}
const printTodoList=(todosListen=[],state="all")=>{
  try {
    let todosFiltering;
    state==="completed"
      ? todosFiltering=todosListen.filter(todo=>todo.isComplete)
      : state==="notCompleted"
      ? todosFiltering=todosListen.filter(todo=>!todo.isComplete) 
      : todosFiltering = todosListen;

    console.log(chalk.greenBright("================= TAREAS ================="));  
    for(let tarea of todosFiltering){
      console.log(chalk.magentaBright.italic("============= POR HACER =================="));
      console.log(chalk.bgCyan("TAREA:",tarea.description.toUpperCase()," "))
      console.log("Estado: ", tarea.isComplete);
      console.log(chalk.magentaBright("===============================\n"));
    }
    return true
  } catch (error) {
    console.error("error no se pudo imprimir datos")
  }
}
const deleteTodoList=(todoListen=[],todoText)=>{
  const todoListenOfKill=todoListen.filter(todo=>todo.description!==todoText)
  saveDB(todoListenOfKill,SAVE_DATA)
}
export{
  crear,
  getTodoList,
  addTodoList,
  loadTodoList,
  updateTodoList,
  printTodoList,
  deleteTodoList
}