
/*
	Arquivo de conexão para o MariaDb
*/

var myArgs = process.argv.slice(2);
var port = 0;

// if(myArgs[0] == '-port'){
// 	port = myArgs[1]
// }
// else{
// 	port = '3306'
// }

// port = process.env.PORT || 3306

// console.log('Porta para o banco de dados: '+port)

// module.exports = function(){

// 	var mysql      = require('mysql');
// 	var connection = mysql.createConnection({
// 		host     : 'localhost',
// 		user     : 'root',
// 		password : '',
// 		database : 'hacka_ima',
// 		port: port
// 	});

// 	connection.connect(function(err) {
// 		if (err) {
// 			console.error('error connecting: ' + err.stack);
// 			return;
// 		}

// 		console.log('Conexão realizada com sucesso!');

// 	});

// 	return connection
// }

module.exports = function(){

	var mongoose = require('mongoose')
	mongoose.Promise = global.Promise

	var uri = 'mongodb://heroku_68zc1kd4:i4shak80loe4avq30n20ik1ak5@ds129013.mlab.com:29013/heroku_68zc1kd4'

	mongoose.connect(uri).then(function(){

		console.log('MongoDb conectado com sucesso!!!')

		// ### Registra Schemas ###

		// Perguntas
		var perguntasSchema = new mongoose.Schema({
			Question: String,
			Tip: String,
			Required: String,
			Options: Array,
			Form: Number
		})

		// Categorias
		var categoriasSchema = new mongoose.Schema({
			Categoria: String
		})

		mongoose.model('Perguntas', perguntasSchema)
		mongoose.model('Categorias', categoriasSchema)


	})

	return mongoose.connection

}
