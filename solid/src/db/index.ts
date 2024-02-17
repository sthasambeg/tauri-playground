import Database from "tauri-plugin-sql-api";
import { Todo } from "../App";

export const db = await Database.load("sqlite:test.db");


export async function sum() {
  return await db.execute("SELECT 1 + 1");
}

export async function createTodo(name: string) {
  console.table(db)
  return await db.execute("INSERT INTO todo (name, done) VALUES (?, ?)", [name, false]);
}

export async function getTodos() {
  return await db.select<Todo[]>("SELECT * FROM todo").then(todos => {
    return todos.map(todo => {
      return {
        ...todo,
        // @ts-expect-error sqlite plugin returns boolean as "true" strings
        done: todo.done === "true"
      }
    })
  });
}

export async function deleteTodo(id: number) {
  return await db.execute("DELETE FROM todo WHERE id = ?", [id]);
}

export async function updateTodo(id: number, done: boolean) {
  return await db.execute("UPDATE todo SET  done = ? WHERE id = ?", [done, id]);
}


