var model = require('../models/models.js');




exports.load = function(req,res,next,courseId){
	model.Curso.findById(courseId).then(function(curso){

			if(curso){ req.curso = curso;
						next();}
				else{ throw new Error('No existe titleId'+ titleId);}


	});



}

exports.get_courses = function(req,res){

	model.Curso.findAll().then(function(courses){

		res.render('cursos',{cursos:courses});

	});
}


exports.show = function(req,res){


		res.render('showcourse',{curso:req.curso});

	}



exports.add_course = function(req,res){


	model.Curso.create({nombre:req.body.nombre, temario:req.body.temario}).then(function(){


		res.redirect('/courses');

	});



}