import { For, createSignal } from "solid-js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./db";


export type Todo = {
  id: number,
  name: string
  done: boolean
}

type HTMLFormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};


const [todos, setTodos] = createSignal<Todo[]>(await getTodos())

async function refreshTodos() {
  const todos = await getTodos()
  setTodos(todos)
}

function TodoPage() {
  async function handleSubmit(e: HTMLFormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const name = formData.get("name")?.toString();
    if (name) {
      await createTodo(name)
      await refreshTodos()
    }
  }

  return (
    <main class="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 class="text-3xl font-bold">Todos</h1>
      <form class="form-control flex flex-row gap-3" onSubmit={handleSubmit} >
        <input type="text" name="name" class="input" placeholder="What needs to be done?" />
        <button type="submit">Add</button>
      </form>
      <div class="flex flex-col gap-2 pt-10">
        <For each={todos()}>
          {(todo) => <Todo todo={todo} />}
        </For>
      </div>
    </main>
  )
}

function Todo({ todo }: { todo: Todo }) {
  async function _deleteTodo() {
    deleteTodo(todo.id)
    await refreshTodos()
  }
  async function toggleTodo() {
    updateTodo(todo.id, !todo.done)
    await refreshTodos()
  }
  return (
    <li class="flex justify-between items-center min-w-[50vw]">
      <h2 class={`${todo.done ? "line-through" : ""}`} > {todo.done ? "✔️" : "❌"} {todo.name}</h2>
      <div class="flex gap-2 items-center">
        <input type="checkbox" class="checkbox" checked={todo.done} onChange={toggleTodo} />
        <button class="btn btn-error btn-sm" onClick={_deleteTodo}>Delete</button>
      </div>
    </li >
  )
}

function App() {
  return (
    <TodoPage />
  );
}

export default App;
