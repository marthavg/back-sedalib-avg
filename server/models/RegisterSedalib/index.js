const mongoose = require('mongoose');
const moment = require ('moment');
const FORMAT_FECHA_REGISTRO = require('../../constants/index');
const Schema = mongoose.Schema;

let validStatus = {
    values: ['R', 'E', 'A']
};

let registerSedalibSchema = new Schema ({
    hora: { type: String, required: [true, 'La hora es necesaria'] },
    fecha: { type: String, required: [true, 'La fecha es necesaria'] },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    numSuministro: { type: String, required: [true, 'El numº Suministro es necesario'] },
    fechaVencimiento: { type: Date, required: [true, 'La fec. Vencimiento es necesaria'] },
    importe: { type: Number, required: [true, 'El importe es necesario'] },
    comision: { type: Number, required: [true, 'La comision es necesaria'] },
    total: { type: Number, required: [true, 'El total es necesario'] },
    fechaCreacion: { type: Date, default: Date.now() },
    fechaModificacion: { type: Date},
    estado: {type: String, default:'R', enum: validStatus},
    referencia: { type: String, unique: true  }
});

registerSedalibSchema.pre('save', function(next) {
    if (this.isNew) {
        var doc = this;
        var date = moment().format(FORMAT_FECHA_REGISTRO.FECHA);
        let regexpRef = new RegExp(date,'i','g');
        let register = mongoose.model('RegisterSedalib', registerSedalibSchema)
        register.countDocuments({referencia: regexpRef }, function (err, count) {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'ocurrio un error al contabilizar los documentos'
                    }
                })
            };

            let countAdd = count + 1;
            doc.referencia = date + countAdd;
            console.log('HGHGH',typeof(date),count,countAdd);
            next();
          });
        }
});

module.exports = mongoose.model('RegisterSedalib', registerSedalibSchema);