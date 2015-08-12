module.exports = function(sequelize, DataTypes){
	

	return sequelize.define('Curso',{

		nombre:DataTypes.STRING ,
		temario:DataTypes.STRING(1234) ,
	});



}
