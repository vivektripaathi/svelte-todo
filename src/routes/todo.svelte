<script>
    let { todo, toggleDone } = $props();
</script>

<div class="item">
    <input
        type="checkbox"
        checked={todo.done}
        onchange={() => toggleDone(todo)}
    />
    <p class:done={todo.done}>{todo.text}</p>
</div>

<style>
    .done {
        text-decoration: line-through;
        color: gray;
    }
</style>
