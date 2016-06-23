<people-app>
    <h1>{ opts.title }</h1>
    <input id="addInput" onkeyup={ add }>
    <button id="subtractInput" onclick={ subtract }>Subtract</button>
    <div>Count: { count }</div>
    <script type="es6">
        this.count = 0
        add = (e) => {
            count++
            this.update()
        }
    </script>
</people-app>