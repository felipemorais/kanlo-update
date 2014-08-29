# grunt-kanlo-update

> Download and Upload Components to Kanlo
> REMEMBER!! This task will NOT do versioning! It's will override your component! BE CAREFUL!

```shell
npm install git+https://github.com/felipemorais/kanlo-update.git --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('kanlo-update');
```

## The "kanlo_update" task

### Overview
In your project's Gruntfile, add a section named `kanlo_update` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  kanlo_auth: grunt.file.readJSON('kanlo-auth.json'), //credentials
  kanlo_update: {
    options:{
      store: '<%= kanlo_auth.store %>',
      username: '<%= kanlo_auth.username %>',
      password: '<%= kanlo_auth.password %>'
    },
    pull: {
      options: {
        method: 'pull.js',
        componentsDir: './components'
      }
    },
    push: {
      options: {
        method: 'push.js',
        componentsDir: './components'
      }
    }
  },
})
```
Create a file to your data store called kanlo-auth.json at the same path that package.js
Remember to add into .gitignore file

{
  "store": "minhaloja", //minhaloja.kanlo.com.br
  "username": "admin@dominio.com.br",
  "password": "password"
}

###Usage

```js
grunt kanlo_update:pull:id[,id]

grunt kanlo_update:push:id[,id]
```

###Tricks
Create a task to do pushAll and pullAll

```js
grunt.registerTask('pullAll', [
    'kanlo_update:pull:617,618,619,620...'
]);
grunt.registerTask('pushAll', [
    'kanlo_update:push:617,618,619,620...'
]);
```