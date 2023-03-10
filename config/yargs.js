import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const argv=yargs(hideBin(process.argv))
  .command("create","crear un elemento por hacer",{
    descripcion:{
      alias:"d",
      demandOption:true,
      description:"DESCRIPCION DE LA TAREA"
    }
  })
  .command("actualizar","actualizar el estado completado de una tarea",{
    completado:{
      alias: "c",
      default:"true",
      description:"marca como completado o pendiente la tarea",
      coerce: (arg) => {
        if(arg==="true" || arg==="false"){
          return arg==="true"?true:false;
        }else{
          throw new Error("El valor del flag -c debe ser un booleano.");
        }
      }
    },
    descripcion:{
      demandOption:true,
      alias:"d",
      description:"descripcion de la tarea por hacer"
    }
  })
  .command("listen","imprimir el todoList",{
    all: {
      alias: "a",
      type: "boolean",
      conflicts: ["completed", "notcompleted"],
      description: "muestra todas las tareas, tanto completadas como no completadas",
    },
    completed: {
      alias: "c",
      type: "boolean",
      conflicts: ["all", "notcompleted"],
      description: "muestra solo las tareas completadas"
    },
    notcompleted: {
      alias: "n",
      type: "boolean",
      description: "muestra solo las tareas no completadas",
      conflicts: ["all", "completed"]
    }
  })
  .command("delete","borra una tarea",{
    id: {
      alias: "i",
      demandOption: true,
      description: "ID de la tarea a eliminar"
    },
  })
  .check(argv => {
      const { all, completed, notcompleted } = argv;
      const options = [all, completed, notcompleted].filter(Boolean)
      if (["listen"].includes(argv._[0])  && options.length !== 1) {
        throw new Error("Debe especificar solo una de las opciones: all, completed o notcompleted");
      }
      return true;
    })
  .help()
  .argv


export{
  argv
}