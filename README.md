# grunt-kanlo-update

> Download and Upload Components to Kanlo



```shell
npm install grunt-kanlo-update --save-dev
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
  kanlo_update: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

criar o arquivo kanlo-auth.json com os dados de login, lembre-se de colocar o arquivo no .gitignore para evitar que seja comitado e sua senha fique pública.

{
  "store": "minhaloja", //minhaloja.kanlo.com.br
  "username": "admin@dominio.com.br",
  "password": "password"
}
### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  kanlo_update: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  kanlo_update: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```
