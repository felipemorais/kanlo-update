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


function getFiles(id){
	//console.log('getFiles', id);
	files = fs.list(componentDir);
	for(var i in files) {
		//ignora paths, comeca com _ e senao começar com o id quando fornecido
		if(files[i][0] == '_' || files[i] == '.' || files[i] == '..' || (id && files[i].indexOf(id + '__') !== 0)){
			continue;
		}
		
		var id = files[i].split('__')[0];
		var name = files[i].split('__')[1];
		
		contents = fs.read(componentDir + '/' + files[i]).toString();
		components[index++] = {
			id: id,
			name: name,
			value: contents
		}
	}
}

if(casper.cli.get('ids')) {
	var ids = casper.cli.raw.get('ids').split(',');
	//console.log(ids);
	ids.forEach(function(item){
		getFiles(item);	
	});
	
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

casper.test.begin('assertPush()', function(test) {

	casper.start('http://' + store + '.kanlo.com.br/admin/login/auth', function() {
		//this.echo(this.getTitle());
		this.fill('#loginForm', { 
			'j_username': username,
			'j_password': password
		}, true);
	});

	casper.then(function() {
		isLogged = ('Admin - minimalia' == this.getTitle());
	    this.test.assertTruthy(isLogged, 'usuario logado');
	});

	var saveComponent = function(index){
		index = index || 0;
		var item = components[index];
		if(!item){
			return false;
		}
		var url = 'https://' + store + '.kanlo.com.br/admin/component/update';

		
		casper.open(url, {
			method: 'POST',
			data: {
				id: item.id,
				commit: 'Salvar',
				name: item.name,
				componentBase: '',
				html: item.value
			}
		});
		casper.then(function() {
			this.test.assertTitle('Admin - Componentes', 'Componente Salvo com sucesso '+item.id);
			saveComponent(++index);
		});
	};
	casper.then(function() {
		if(isLogged){
			saveComponent();
		}
	});
	casper.run();
});
