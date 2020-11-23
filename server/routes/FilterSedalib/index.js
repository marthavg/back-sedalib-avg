const express = require('express');

let app = express();

let RegisterSedalib = require('../../models/RegisterSedalib/index');

// ==========================
// Filtrar Sedalib
// ==========================
app.get('/filterSedalib', (req, res) => {
    let body = req.body;
     
    let regexpReferencia = new RegExp(body.referencia, "g");
    let regexpNombre = new RegExp(body.nombre,'i','g');
    let regexpSuministro = new RegExp(body.numSuministro, "g");
    
   
    var queryFilter = new Object();

    if( body.referencia!= null && body.referencia != undefined && body.referencia != '' ) {
        queryFilter.referencia = regexpReferencia;
    }
    if( body.fecha!= null && body.fecha != undefined && body.fecha != '' ) {
        queryFilter.fecha = body.fecha;
    }
    if( body.nombre!= null && body.nombre != undefined && body.nombre != '' ) {
        queryFilter.nombre = regexpNombre;
    }
    if( body.numSuministro != null && body.numSuministro != undefined && body.numSuministro != '' ) {
        queryFilter.numSuministro = regexpSuministro;
    }

    let options = {
        referencia: 1,
        numSuministro: 1,
        fecha: 1,
        nombre:1,
        fechaVencimiento: 1,
        importe: 1,
        comision: 1,
        total:1
    };
    console.log('filterr',queryFilter);

    RegisterSedalib.find(queryFilter, options)
        .where({estado: {$ne:'E'}})
        .exec((err, registerSedalibDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!registerSedalibDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El termino no es correcto'
                    }
                });
            }

            res.json({
                ok: true,
                registerSedalib: registerSedalibDB
            });

        });
});

module.exports = app;