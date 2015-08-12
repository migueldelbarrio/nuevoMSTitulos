var model = require('../models/models.js');


exports.loginRequired = function(req,res,next){

	if(!!req.session.user){next();}
		else{res.redirect('/login');}




}

exports.destroy = function(req,res){

	delete req.session.user;

	res.redirect('/admin');



}



exports.index = function(req,res){
	
	res.render('login');
}


exports.login = function (req,res){

	model.Usuario.findAll({where:{nombre:req.body.nombre, clave:req.body.clave}}).then(function(usuario){


		if(!!usuario[0]){console.log('Login completed'); req.session.user={id:usuario.id, nombre:usuario.nombre}; res.redirect(req.session.redir)}
			else{console.log('Failled login'); req.session.error="Error de autenticación";res.redirect('/login')}


	});

}
