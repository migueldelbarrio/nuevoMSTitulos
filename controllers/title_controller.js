var model = require('../models/models.js');

var randomstring = require("randomstring");

var qrCode = require('qrcode-npm');


exports.load = function(req,res,next,titleId){
	model.Titulo.findById(titleId).then(function(title){

			if(title){ req.title = title;

					model.Curso.findOne({ where: { nombre: req.title.curso } }).then(function(curso){
						req.curso=curso;
						console.log(req.curso.nombre +'||'+req.curso.temario);
						next();

					});

					}
				else{ throw new Error('No existe titleId'+ titleId);}


	});



}

exports.delete = function(req,res){


  req.title.destroy().then(function(){ res.redirect('/admin')})




};

exports.verify = function(req,res){


	model.Titulo.findOne({ where: { codigo: req.query.title_code } }).then(function(titulo){

		if (titulo){
			model.Curso.findOne({ where: { nombre: titulo.curso } }).then(function(curso){

						var qr = qrCode.qrcode(4, 'M');
						qr.addData(titulo.codigo);
						qr.make();
						var qr_send=qr.createImgTag(4);
						
						res.render('verified',{titulo:titulo, curso:curso,qr:qr_send});

			});

		}else{ res.render('index', {error_verify:1})}

	});

}







exports.admin_panel = function(req, res) {


		model.Curso.findAll().then(function(courses){


		res.render('admin', {cursos:courses});

	});
  
};

exports.get_titles = function(req,res){

	model.Titulo.findAll().then(function(titulos){


		res.render('titulos',{titulos:titulos});

	});



}


exports.create_dummy = function(req,res){

	model.Titulo.create({nombre:'Dummy', apellidos:'Dummy', dni:'Dummy', telefono:666666666, curso:'Dummy', horas:24, tipo:'asistencia', nota:50}).then(function(titulos){


		res.redirect('/titles');

	});




}

exports.edit = function(req,res){

model.Curso.findAll().then(function(courses){


		res.render('title_edit',{title:req.title, curso: req.curso, cursos:courses});
	});




}


exports.add_title = function(req,res){

	
						var req=req;
						var res=res;
						var iteracion=0;

	(function loop(){
						console.log('Iteracion: '+iteracion);
						iteracion++;
						var aleatorio= randomstring.generate(20);
						

						if(!req.body.dni.match(/^\d{8}[a-zA-Z]$/)){
							model.Curso.findAll().then(function(courses){


								res.render('admin', {cursos:courses, error_title:"DNI Incorrecto"});

							});
							//res.send('<h1>DNI incorrecto</h1><a href="/admin">Volver</a>');
							return;

						};

			
						
						
						model.Titulo.findOne({ where: { codigo: aleatorio } }).then(function(titulo){

									if(!titulo){
										
											console.log("El código generado NO existe");
											
											model.Titulo.create({nombre:req.body.n_alumno, apellidos:req.body.a_alumno, dni:req.body.dni, telefono:req.body.telefono, curso:req.body.curso, horas:req.body.horas, codigo:aleatorio, inicio: req.body.inicio, fin:req.body.fin, tipo:req.body.tipo, nota:req.body.nota}).then(function(titulos){
											
											res.redirect('/titles');
											
									});
									}else{console.log("El código generado ya existe");loop();}

							
						});
			
				

		})();

}

exports.render = function(req,res){

	var qr = qrCode.qrcode(4, 'M');
	qr.addData(req.title.codigo);
	qr.make();
	var qr_send=qr.createImgTag(4);

res.render('render',{titulo:req.title, curso:req.curso, qr:qr_send});



}
