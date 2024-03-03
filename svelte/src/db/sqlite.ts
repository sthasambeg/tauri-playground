import Database from "tauri-plugin-sql-api";
import type { Todo } from "../types";

export const db = await Database.load("sqlite:todo.db");

export async function createTodo(name: string) {
  return await db.execute("INSERT INTO todo (name, done) VALUES ($1, $1)", [name, false]);
}

export async function getTodos() {
  return await db.select<Todo[]>("SELECT * FROM todo").then((todos) => {
    return todos.map((todo) => {
      return {
        ...todo,
        // @ts-expect-error: comes as string from db
        done: todo.done === "true",
      };
    });
  });
}

export async function deleteTodo(id: number) {
  return await db.execute("DELETE FROM todo WHERE id = $1", [id]);
}

export async function updateTodo(id: number, done: boolean) {
  return await db.execute("UPDATE todo SET  done = $1 WHERE id = $2", [done, id]);
}
