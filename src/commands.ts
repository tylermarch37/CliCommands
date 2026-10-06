import { addItem, readItems, deleteItem, updateItem } from './storage.js';


//creates a type for the tasks list
export type TaskList = Task[]

//creates the individual tasks type shape
export type Task = {
    id: number,
    description: string,
    completed: "x" | " "
}


//cleans the user input
export function inputHelper(input: string): string[]{
    return input.trim().toLowerCase().split(" ")
}


//The shape of the commands
export const commands = {
    help: helpCommand,
    add: addCommand,
    list: listHelper,
    complete: completeHelper,
    delete: deleteHelper
}

//command for help - Lists the available commands
function helpCommand(){
    console.log("Available commands: \nadd \nlist \ncomplete \ndelete \nhelp \nexit")
}

//Command for Add - Allows a user to add a task to the list
async function addCommand(description: string, id: number): Promise<void>{
    await addItem({
        id:id,
        description: description,
        completed: " "
    })
    return
}

//Command for list - Lists the current tasks on the task list
async function listHelper(): Promise<void>{
    const taskList = await readItems()
    for (const task of taskList){
        console.log(`${task.id}. [${task.completed}] ${task.description}`)
    }
}

//Command for completing task (marking x within the completed feild). 
async function completeHelper(id: number):Promise<void>{
    let taskList = await readItems()
    let taskIndex = -1
    for (const task of taskList){
        taskIndex ++
        if (task.id === id){
            await updateItem(taskIndex)
            console.log(`${id} has been marked as complete.`)
            return 
        }   
    }
    console.log(`${id} not found. For the existing list please use the command "list"`)
    return 
}



//Command for delete - Removes the task based on the given id
async function deleteHelper(id: number):Promise<void>{
    let taskList = await readItems()
    let taskIndex = -1
    let deletedItem = ""
    for (const task of taskList){
        taskIndex ++
        if (task.id === id){
            deletedItem = task.description
            await deleteItem(taskIndex)
            console.log(`${deletedItem} successfully deleted`)
            return 
        }
    }
    console.log(`${id} not found. For the existing list please use the command "list"`)
    return 
    
}


