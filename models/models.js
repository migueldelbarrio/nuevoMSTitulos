var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

var randomstring = require("randomstring");

var qrCode = require('qrcode-npm');



var sequelize = new Sequelize(DB_name, user, pwd, 
                       {dialect: protocol,protocol:protocol,port:port,host:host,storage:storage, omitNull:true}
                    );

var Titulo = sequelize.import(path.join(__dirname,'titulo'));

var Curso = sequelize.import(path.join(__dirname,'curso'));

var Usuario = sequelize.import(path.join(__dirname,'usuarios'));

exports.Titulo = Titulo;

exports.Curso = Curso;

exports.Usuario = Usuario;

sequelize.sync().then(function(){

	Titulo.count().then(function(count){
		if(count==0){
			var aleatorio= randomstring.generate(20);
		Titulo.create({nombre:'Jose', apellidos:'Gutierrez', dni:'48522344A',telefono:666666666,curso:'Premiere', horas:23, codigo:aleatorio, inicio:'29 de Junio de 2015', fin:'30 de Julio de 2015', tipo:'SUPERACIÓN', nota:75}).
		then(function(){console.log('DB Titulo inicializada')});
	}
	});

	Curso.count().then(function(count){
		if(count==0){
		Curso.create({nombre:'Premiere', temario:'<h1>Temario de Premiere</h1>'}).
		then(function(){console.log('DB Curso inicializada')});
	}
	});
	Usuario.count().then(function(count){
		if(count==0){
		Usuario.create({nombre:'murciastudio', clave:'Andalucia01', perfil:'Administrador'}).
		then(function(){console.log('DB Usuarios inicializada')});
	}
	});

});