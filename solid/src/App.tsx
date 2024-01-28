import { createSignal } from "solid-js";


type Todo = {
  id: string,
  name: string
  done: boolean
}

type HTMLFormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};


const [todos, setTodos] = createSignal<Todo[]>([{
  id: crypto.randomUUID(),
  name: "Learn Solid",
  done: false
},
{
  id: crypto.randomUUID(),
  name: "Learn Tauri",
  done: true
}

])

function TodoPage() {
  function handleSubmit(e: HTMLFormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const name = formData.get("name")?.toString();
    if (name) {
      setTodos((todos) => [...todos, { id: crypto.randomUUID(), name, done: false }])
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
        {todos().map((todo) => <Todo todo={todo} />)}
      </div>
    </main>
  )
}

function Todo({ todo }: { todo: Todo }) {
  return (
    <li class="flex gap-20 items-center">
      <h2> {todo.done ? "✔️" : "❌"} {todo.name}</h2>
      <button class="btn btn-error btn-sm">Delete</button>
    </li>
  )
}

function App() {
  return (
    <TodoPage />
  );
}

export default App;
