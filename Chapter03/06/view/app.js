const template = `
<section class="todoapp">
<header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus>
</header>
<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">
        Mark all as complete
    </label>
    <ul class="todo-list" data-component="todos">
    </ul>
</section>
<footer class="footer">
    <span class="todo-count" data-component="counter">
        1 Item Left
    </span>
    <ul class="filters" data-component="filters">     
    </ul>
    <button class="clear-completed">
        Clear completed
    </button>
</footer>
</section>
`