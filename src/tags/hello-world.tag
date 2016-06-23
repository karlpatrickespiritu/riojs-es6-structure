<hello-world>
    <h1>{ opts.title }</h1>
    <input id="addInput" onkeyup={ add }>
    <button id="subtractInput" onclick={ subtract }>Subtract</button>
    <div>Count: { count }</div>
    <div>Count: { count }</div>
    <script>
        this.count = 0
        add = function(e) {
            this.count++
            this.update()
        }
    </script>
</hello-world>
