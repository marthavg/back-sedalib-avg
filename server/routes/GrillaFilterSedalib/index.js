const express = require('express');

let app = express();

let RegisterSedalib = require('../../models/RegisterSedalib/index');

// ==========================
// Filtrar Sedalib al limpiar
// ==========================
app.get('/filterSedalibGrid', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

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
    RegisterSedalib.find({},options)
    .sort({fechaCreacion:'desc'})
    .where({estado: {$ne:'E'}})
    .skip(desde)
    .limit(limite)
    .exec((err, registerSedaliBDbGr)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!registerSedaliBDbGr){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            registerSedaliGr: registerSedaliBDbGr
        });
    });
});

module.exports = app;