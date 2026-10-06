import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { commands, inputHelper, TaskList } from './commands.js';




async function main(){
    const rl = readline.createInterface({ input, output });
    let id = 0

    console.log("Welcome to the to do list APP\nPlease enter your first command ")
    while (true){
        //Start the stream 
        const answer = await rl.question('> ');
        //cleans up the user input - Trims trailing spaces, makes things case insensitive and splits the input by spaces
        const inputCommand = inputHelper(answer)
        //lists all available commands
        if (inputCommand[0] === "help"){
            commands.help()
        }
        //adds a task to the list if there is text after the add command
        else if (inputCommand[0] === "add"){
            if (inputCommand.length <2){
                console.log("please add a description to the task being added")
                continue
            }
            //joins the text given after the initial command of add. This will make up the description of the task
            let description = inputCommand.slice(1).join(" ")
            //adds the actual task to the active list
            await commands.add(description,id)
            //Writes to the terminal to confirm the task has been added to the queue
            console.log(`"${description}" added to the task queue`)
            //increase the index number 
            id ++
            continue
        }
        //lists all the tasks currently in the queue
        else if (inputCommand[0] === "list"){
            await commands.list()
            continue
        }
        //Updates an task to show it's complete. This is done by updating the complete value to "x"
        else if (inputCommand[0] === "complete"){
                if (inputCommand.length != 2){
                    console.log("Please enter a valid task number to complete")
                    continue
            }
            await commands.complete(Number(inputCommand[1]))

            continue
        }
        //deletes a task based on the id given
        else if (inputCommand[0] === "delete"){
            if (inputCommand.length != 2){
                console.log("Please enter a valid task number to delete")
                continue
            }
            await commands.delete(Number(inputCommand[1]))
            continue

        }

        //breaks out of the loop which in turn will hit the rl.close and end the programme
        else if(inputCommand[0] === "exit"){
            break
        }
        else {
            console.log("Invalid command. Type help for a list of commands")
        }
        }
    rl.close();
    console.log("Goodbye")
}

main()
