<script lang="ts">
  type Todo = {
    id: string;
    name: string;
    done: boolean;
  };
  let todoList: Todo[] = [];
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    if (!name) {
      return;
    }

    todoList = [...todoList, { id: crypto.randomUUID(), name, done: false }];
  }
</script>

<main class="flex flex-col items-center justify-center h-screen space-y-4">
  <h1 class="text-3xl font-bold">Todos</h1>
  <form class="form-control flex flex-row gap-3" on:submit={handleSubmit}>
    <input
      type="text"
      name="name"
      class="input"
      placeholder="What needs to be done?"
    />
    <button type="submit">Add</button>
  </form>
  <div class="flex flex-col gap-2 pt-10">
    {#each todoList as todo}
      <!-- content here -->
      <li class="flex justify-between items-center min-w-[50vw]">
        <h2 class={`${todo.done ? "line-through" : ""}`}>
          {todo.done ? "✔️" : "❌"}
          {todo.name}
        </h2>
        <div class="flex gap-2 items-center">
          <input type="checkbox" class="checkbox" checked={todo.done} />
          <button class="btn btn-error btn-sm">Delete</button>
        </div>
      </li>
    {/each}
  </div>
</main>
