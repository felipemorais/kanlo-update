var fs = require('fs'),
	casper = require('casper').create();

var isLogged = false,
	files,
	contents,
	components = [],
	index = 0,
	store,
	password,
	username,
	componentDir = './components';

if(casper.cli.get('ids')) {
	components = casper.cli.raw.get('ids').split(',');
}else{
	casper.echo("Nenhum id fornecido").exit();
}

if(casper.cli.get('store')) {
	store = casper.cli.raw.get('store');
}else{
	casper.echo("Nenhuma store fornecida").exit();
}

if(casper.cli.get('username') || casper.cli.get('password')) {
	password = casper.cli.raw.get('password');
	username = casper.cli.raw.get('username');
}else{
	casper.echo("Usuario ou senha não fornecidos").exit();
}

casper.test.begin('assertPull()', function(test) {

	casper.start('http://' + store + '/admin/login/auth', function() {
		this.echo(this.getTitle());
		this.fill('#loginForm', { 
			'j_username': username,
			'j_password': password
		}, true);
	});

	casper.then(function() {
		console.log(this.getTitle(), this.getTitle().indexOf('Admin'))
		isLogged = (this.getTitle().indexOf('Admin') === 0);
	    this.test.assertTruthy(isLogged, 'usuario logado') ;
	});

	var importComponent = function(index){
		index = index || 0;
		var item = components[index];
		if(!item){
			return false;
		}
		var url = 'http://' + store + '/admin/component/edit/'+item;

		casper.thenOpen(url, function(){

			this.then(function() {

				var html = casper.evaluate(function(){
					var name = document.querySelector('input[name="name"]').value;
					var content = document.querySelector('textarea[name="html"]').value;
					return {name:name, content:content};
				});

				//Verifique se tem permissao para editar o ID
				this.test.assertTruthy((html.name && html.content), 'ID Encontrado e dados capturados');

				fs.write(componentDir + '/' + item + '__' + html.name, html.content, 'w');
				importComponent(++index);

			});	
		});
	};
	casper.then(function() {
		if(isLogged){
			importComponent();
		}
	});
	casper.run();
});
