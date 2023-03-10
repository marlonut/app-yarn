import { argv } from "./config/yargs.js";
import { crear, getTodoList, loadTodoList, addTodoList, updateTodoList ,printTodoList, deleteTodoList} from "./todo-list/todo.js";
const command=argv._[0]


const methodsArgv={
  create:()=>{
    const todos = getTodoList();
    const todoCreate = crear({ description: argv.descripcion });
    addTodoList([...todos, todoCreate]);
    console.log("Tarea creada exitosamente.");
  },
  listen:()=>{

    const todos = getTodoList();
    printTodoList(todos,argv.completed ? "completed" : argv.notcompleted ? "notCompleted" : "all")
     
    console.log("Mostrando las tareas por hacer...");
  },
  actualizar:()=>{
    const todos=getTodoList()
    updateTodoList(todos,argv.descripcion,argv.completado);
    console.log("Actualizando la tarea por hacer...");
  },
  delete:()=>{
    const todos=getTodoList();
    deleteTodoList(todos,argv.id)
    console.log("Eliminando datos en espera ....")
  },
  default:()=>{
    console.log("Comando no reconocido.");
  }
}

const main = async () => {
  try {
    // Cargar datos al inicio
    console.log("Cargando datos...");
    await loadTodoList();
    
    // Ejecutar el comando
    const methodTodo=methodsArgv[command] ?? methodsArgv["default"]
    
    methodTodo()

  } catch (error) {
    console.error("Error al ejecutar el comando:", error);
  }
};

// Ejecutar la aplicación principal
main();