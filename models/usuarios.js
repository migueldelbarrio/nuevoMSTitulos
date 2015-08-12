module.exports = function(sequelize, DataTypes){
	

	return sequelize.define('Usuarios',{

		nombre:DataTypes.STRING ,
		clave:DataTypes.STRING ,
		perfil:DataTypes.STRING ,
	});



}