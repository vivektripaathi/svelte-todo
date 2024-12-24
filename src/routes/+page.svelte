<script>

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    const today = new Date().toLocaleDateString("en-US", options);

    let lastId = 0;

    const createTodo = (text, done = false) => ({
        id: ++lastId,
        text,
        done,
    });

    let todos = $state([
        createTodo('Understand Svelte Basics'),
        createTodo('Set Up Svelte Development Environment'),
    ]);

    const toggleDone = (todo) => {
        const { id } = todo;
        todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    };

    let todoText = $state('');
    const addTodo = (event) => {
        event.preventDefault()
        todos.push(createTodo(todoText));
        todoText = "";
    };
</script>

<div class="box">
    <h1>{today}</h1>

    {#each todos as todo}
        <div class="item">
            <input
                type="checkbox"
                checked={todo.done}
                onchange={() => toggleDone(todo)}
            />
            <p class:done={todo.done}>{todo.text}</p>
        </div>
    {/each}

    <form onsubmit={addTodo} class="item">
        <input
            type="text"
            bind:value={todoText}
            placeholder="Create new Todo"
        />
        <button disabled={!todoText}>+</button>
    </form>
</div>
