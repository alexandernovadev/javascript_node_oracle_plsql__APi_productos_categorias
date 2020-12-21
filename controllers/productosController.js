var conexion = require('../conexionoracle');


var controller = 
{
    getProductoby_idcategoria:async(req, res)=>{

        var idcat = +req.params.idcat;
        
        let sql = `BEGIN getproductos_byid_categoria(:cursor,${idcat}); END;`
        let data = await conexion.con(sql, true);
    
        let format = []
        data.map(a=>{
            console.log('id ',a[0]);
            const date ={
                'id':a[0],
                'nombre':a[1],
                'descripcion':a[2],
                'iva':a[3],
                'precio_venta':a[4],
                'precio_provedor':a[5],
                'cantidad': a[6],
                'id_tipo_producto': a[7],
                'id_categoria':a[8]
            }
            format.push(date);
        })
        // TODO si el rank No existe ?

        let rta;
        if(data.length == 0){
            rta = res.status(200).send({
                message: "No existe productos",
                status: 'error',
            });
        }else{

            rta = res.status(200).send({
                message: "Productos Encontrados",
                status: 'success',
                data: format
            });
        }
        return rta;
    },
}

module.exports = controller;