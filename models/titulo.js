module.exports = function(sequelize, DataTypes){
	

	return sequelize.define('Titulo',{

		nombre:DataTypes.STRING ,
		apellidos:DataTypes.STRING ,
		dni:DataTypes.STRING,
		telefono:DataTypes.INTEGER,
		curso:DataTypes.STRING,
		horas:DataTypes.INTEGER,
		codigo:DataTypes.STRING,
		inicio:DataTypes.STRING,
		fin:DataTypes.STRING,
		tipo:DataTypes.STRING,
		nota:DataTypes.INTEGER,


	});



}