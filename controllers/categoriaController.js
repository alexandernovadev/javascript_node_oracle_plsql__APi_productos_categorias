var conexion = require('../conexionoracle');
var eje = require('../ejemplooracle');

var controller = 
{
    getCategoriabyRanknum:async(req, res)=>{

        var num = +req.params.num;
        
        let sql = `BEGIN categorias_by_rank(:cursor,${num}); END;`
        let data = await conexion.con(sql, true);
        

        let format ={
            'id': data[0][0],
            'nombre': data[0][1],
            'descripcion': data[0][2],
            'rank_no': data[0][3],
        }
        // TODO si el rank No existe ?
        return res.status(200).send({
            message: "Categoria Encontrada",
            status: 'success',
            data: format
        });
    },
    getMinMax:async(req,res)=>{

        let data = await eje.con();
        
        return res.status(200).send({
            message: "Ejemploc",
            status: 'success',
            data
        });
    },
    getcategorias: async (request, response)=>
    {
        let sql = `BEGIN categorias(:cursor); END;`
        let data = await conexion.con(sql, true);

        console.log("U ESTO", data);
        
        let arr = []
        data.map(dato =>{
            // console.log("->", dato[0]);
            let json = {
                'id': dato[0],
                'nombre':dato[1],
                'descripcion':dato[2]
              }
            arr.push(json)
        })

        return response.status(200).send({
            message: "Categorias",
            data: arr
        });
    },
    getcategoriasbyid: async (request, response)=>
    {

        var id = request.params.id;
        
        let sql = `BEGIN categorias_by_id(:cursor,${id}); END;`
        let data = await conexion.con(sql, true);

        // console.log("U ESTO", data);
        
        let arr = []
        data.map(dato =>{
            // console.log("->", dato[0]);
            let json = {
                'id': dato[0],
                'nombre':dato[1],
                'descripcion':dato[2]
              }
            arr.push(json)
        })

        let rta;
        if(arr.length == 0){
            rta= response.status(404).send({
                message: "Categoria con el id "+id,
                status: "error",
                info: "No existe la categoria "
            });
        }else{
            rta =  response.status(200).send({
                message: "Categoria con el id "+ id,
                status: 'success',
                data: arr
            });
        }
       return rta;
    },
    save_categoria: async (request, response)=>{

        // Se puede validar, pero me da pereza :D
        // mejor solo lo hago desde el front
        let id = +request.body.id;
        let name = request.body.nombre;
        let desc = request.body.descripcion;

        let dataoralce =
        {
            sql: `BEGIN insert_categoria(:id,:nombre,:description); END;`,
            binds:{
                id: id,
                nombre: name,
                description: desc
            }
        }

        let data = await conexion.con(dataoralce, false)

        let rta;
        if(data){
            rta = response.status(200).send({
                message: "Categoria Guardada",
                status: 'success'
            })
        }else{
            rta = response.status(200).send({
                message: "Categoria no Gurdada",
                status: 'error'
            })
        }

        return rta

    },
    update_categoria: async (request, response)=>{

        let id = +request.params.id;
        let name = request.body.nombre;
        let desc = request.body.descripcion;

        let dataoralce =
        {
            sql: `BEGIN updated_categoria(:id,:nombre,:descripcion); END;`,
            binds:{
                id: id,
                nombre: name,
                descripcion: desc
            }
        }

        let data = await conexion.con(dataoralce, false)

        let rta;
        if(data){
            rta = response.status(200).send({
                message: "Categoria Actualizada",
                status: 'success'
            })
        }else{
            rta = response.status(200).send({
                message: "Categoria no Actualizada",
                status: 'error'
            })
        }

        return rta
    },
    delete_categoria: async (request, response)=>{

        let id = request.params.id

        let dataoralce =
        {
            sql: `BEGIN delete_categoria(:id); END;`,
            binds:{
                id: id
            }
        }
    
        // TODO mejorear si no esxite el id
        let data = await conexion.con(dataoralce, false);

        console.log(data);
        
        return response.status(200).send({
            message: "Categoria Borrada",
            status: 'success'
        })
    }

}

module.exports = controller;