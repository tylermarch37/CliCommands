import { readFile, writeFile } from 'node:fs/promises'
import { Task } from './commands.js';



const outputFilePath: string = 'event_data.json';


//We need to convert to JSON so we can store that output in a file.

export function jsonConverter(data: Task[]){
    const jsonData = JSON.stringify(data, null, 4)
    return jsonData
}



//Reads JSON from File and converts it to a list of objects that we can manipulate and read. If the file doesn't exist, instead it will return an empty array.
export async function readItems(): Promise<Task[]> {
  try {
    const data = await readFile(outputFilePath, "utf-8");

    return JSON.parse(data) as Task[];
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}


//Reads the existing file (assuming it exists) and then appends this to the end. Due to the nature of the JSON file, we rewrite the file each time instead of actually appending. 
export async function addItem(item: Task): Promise<void> {
  const items = await readItems();
  item.id = items.length
  items.push(item);

  await writeFile(
    outputFilePath,
    JSON.stringify(items, null, 4)
  );
}


//Deletes an item at the chosen index
export async function deleteItem(taskIndex: number): Promise<void> {
  const items = await readItems();
  let currentIndex = -1
  items.splice(taskIndex, 1);

  for (const item of items){
    currentIndex ++
    item.id = currentIndex
  }

  await writeFile(
    outputFilePath,
    JSON.stringify(items, null, 4)
  );
}

//Updates an item in the JSON file
export async function updateItem(taskIndex: number): Promise<void> {
  const items = await readItems();

  for (const item of items){
    if (item.id === taskIndex){
      item.completed = "x"
    }
  }

  await writeFile(
    outputFilePath,
    JSON.stringify(items, null, 4)
  );
}