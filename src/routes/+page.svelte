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

<style>
    :global(body) {
        background-color: #e4e9fd;
        background-image: -webkit-linear-gradient(
            180deg,
            #a683e3 50%,
            #e4e9fd 50%
        );
        min-height: 1000px;
        font-family: "helvetica neue";
    }

    h1 {
        color: #fff;
        padding: 10px;
        background-color: #a683e3;
        text-align: center;
    }

    .box {
        max-width: 400px;
        margin: 50px auto;
        background: white;
        border-radius: 5px;
        box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.3);
    }

    .item {
        min-height: 70px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
    }

    .item:last-child {
        border-bottom: 0;
    }

    input:checked + p {
        text-decoration: line-through;
        text-decoration-color: #a683e3;
    }

    input[type="checkbox"] {
        margin: 20px;
    }

    p {
        margin: 0;
        padding: 20px;
        font-size: 20px;
        font-weight: 200;
        color: #00204a;
    }

    form {
        text-align: center;
        margin-left: 20px;
    }

    button {
        min-height: 50px;
        width: 50px;
        border-radius: 50%;
        border-color: transparent;
        background-color: #a683e3;
        color: #fff;
        font-size: 30px;
        padding-bottom: 6px;
        border-width: 0;
    }

    input[type="text"] {
        text-align: center;
        height: 60px;
        top: 10px;
        border: none;
        background: transparent;
        font-size: 20px;
        font-weight: 200;
        width: 313px;
    }

    input[type="text"]:focus {
        outline: none;
        box-shadow: inset 0 -3px 0 0 #a683e3;
    }

    ::placeholder {
        color: grey;
        opacity: 1;
    }
</style>
