var conexion = require('./conection');

var controller = 
{
    
    probando: async (request, response)=>
    {
        let sql = `BEGIN getEmpleaboByID(:cursor, 2010); END;`
        let tryconexion = await conexion.con(sql);

    
        return response.status(200).send({
            message: "Soy el metodo probando",
            data: tryconexion
        });
    },
    getcategorias: async (request, response)=>
    {
        let sql = `BEGIN categorias(:cursor); END;`
        let categorias = await conexion.con(sql);

        
    
        return response.status(200).send({
            message: "Categorias",
            data: categorias
        });
    }
}

module.exports = controller;