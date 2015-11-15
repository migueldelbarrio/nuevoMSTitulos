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
			//var aleatorio= randomstring.generate(10);
		Titulo.create({nombre:'Alumno de', apellidos:'murciaSTUDIO', dni:'55555555A',telefono:666666666,curso:'Premiere', horas:24, codigo:'tID2MSIzjx', inicio:'29 de Junio', fin:'30 de Julio de 2015', tipo:'SUPERACIÓN', nota:75}).
		then(function(){console.log('DB Titulo inicializada')});
	}
	});

	Curso.count().then(function(count){
		if(count==0){
		Curso.create({nombre:'Adobe Premiere CC', temario:'<p><strong>Unidad 1:Entorno de trabajo</strong></p>
<p><strong>Unidad 2:Trazados de forma libre. Creación y modificación de trazados</strong></p>
<p><strong>Unidad 3:Acciones sobre objetos. Herramientas de transformación</strong></p>
<p><strong>Unidad 4:Introducir texto. Trabajo con texto y trazados. Modos de color. Atributos de color. Degradados.</strong></p>
<p><strong>Unidad 5:capas en Illustrator. Estructura de capas. Opciones de capa (bloqueo/desbloqueo, selecciones). Capas anidadas. Desplazamiento de objetos en capas</strong></p>
<p><strong>Unidad 6:Mallas, fusiones, expandir invertir y soltar. Los degradados y Mallas de degradado. Examinar Fusiones. Degradados unificados. Uso de transparencias en Illustrator. Máscaras de opacidad y colores transparentes</strong></p>
<p><strong>Unidad 7:Importación de vectoriales y Bitmaps. Importación de texto. Exportar bitmaps y vectoriales. Exportar textos. Exportar como archivo Photoshop. Exportar como archivo de Flash</strong></p>'}).
		then(function(){console.log('DB Curso inicializada')});
	}
	});
	Usuario.count().then(function(count){
		if(count==0){
		Usuario.create({nombre:'murciastudio', clave:'1234', perfil:'Administrador'}).
		then(function(){console.log('DB Usuarios inicializada')});
	}
	});

});
