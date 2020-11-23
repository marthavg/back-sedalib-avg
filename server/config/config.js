// =======================
// Puerto
// =======================
//process.env.PORT = process.env.PORT || 3001;

// =======================
// Entorno
//========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
// Vencimiento del token
// =======================
//process.env.CADUCIDAD_TOKEN = '24h';

// =======================
// SEED de autenticación
//========================
process.env.SEED = process.env.SEED || '+.kBi4z!yBBvq%cT9GhZ*/'

// =======================
// Base de datos
//========================
let urlDB;

if(process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/sedalib';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;