const express = require('express');

let app = express();

let RegisterSedalib = require('../../models/RegisterSedalib/index');

// ==========================
// Registrar Sedalib
// ==========================
app.post('/registerSedalib', (req, res) => {

    let body = req.body;
    
    let registerSedalib = new RegisterSedalib ({
        hora: body.hora,
        fecha: body.fecha,
        nombre: body.nombre,
        numSuministro: body.numSuministro,
        fechaVencimiento: body.fechaVencimiento,
        importe: body.importe,
        comision: body.comision,
        total: body.total
    });

    registerSedalib.save((err, registerSedalibDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!registerSedalibDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            registroSedalib: registerSedalibDB
        });
    });

});

module.exports = app;