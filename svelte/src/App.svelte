<script lang="ts">
  import { onMount } from "svelte";

  import { createTodo, deleteTodo, getTodos, updateTodo } from "./db/sqlite";
  import { Trash2, RefreshCw } from "lucide-svelte";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import { autoModeWatcher } from "@skeletonlabs/skeleton";
  import { getTheme, AvailableThemes, setTheme } from "./store/store";

  import type { Todo } from "./types";
  import type { AvailableThemes as TAvailableThemes } from "./store/store";

  let todos: Todo[] = [];
  let loading: boolean = false;
  let theme = "";

  onMount(async () => {
    await refreshTodos();
    theme = await getTheme();
    autoModeWatcher();
  });

  function toggleLoading() {
    loading = !loading;
  }

  async function refreshTodos() {
    toggleLoading();
    todos = await getTodos();
    toggleLoading();
  }

  async function toggleTodo(todo: Todo) {
    toggleLoading();
    await updateTodo(todo.id, !todo.done);
    await refreshTodos();
    toggleLoading();
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    if (!name) {
      return;
    }

    await createTodo(name);
    await refreshTodos();
  }

  async function handleDelete(id: number) {
    await deleteTodo(id);
    await refreshTodos();
  }

  async function handleThemeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    theme = target.value;
    await setTheme(theme as TAvailableThemes);
  }
</script>

<main class="flex flex-col items-center justify-center h-screen space-y-4" data-theme={theme}>
  <div class="flex flex-row gap-3 items-center justify-center mt-2">
    <h2>Theme</h2>
    <select
      id="theme"
      class="text-black"
      on:change={async (e) => await handleThemeChange(e)}
      value={theme}
    >
      {#each AvailableThemes as theme}
        <option value={theme}>{theme}</option>
      {/each}
    </select>
  </div>

  <div class="mt-10 flex flex-row gap-3 items-center justify-center">
    <LightSwitch />
    <h1 class="text-3xl font-bold">Todos</h1>
    <button class="btn btn-sm btn-ghost h-fit" on:click={async () => await refreshTodos()}
      ><RefreshCw size={14} /></button
    >
  </div>
  <form class="form-control flex flex-row gap-3" on:submit={handleSubmit}>
    <input type="text" name="name" class="input" placeholder="What needs to be done?" />
    <button type="submit" class="btn variant-soft-primary">Add</button>
  </form>
  <div class="flex flex-col gap-2 pt-10 flex-grow">
    {#if loading}
      <span class="loading loading-spinner loading-sm" />
    {:else}
      {#each todos as todo}
        <!-- content here -->
        <li class="flex justify-between items-center min-w-[50vw]">
          <h2 class={`${todo.done ? "line-through opacity-60" : ""}`}>
            {todo.name}
          </h2>
          <div class="flex gap-2 items-center">
            <input
              type="checkbox"
              class="checkbox w-6 h-6"
              checked={todo.done}
              on:change={async () => await toggleTodo(todo)}
            />
            <button class="btn btn-error btn-sm" on:click={async () => await handleDelete(todo.id)}>
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      {/each}
    {/if}
  </div>
</main>
