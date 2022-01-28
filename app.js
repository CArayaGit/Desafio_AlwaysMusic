const client = require('./db/client.js');
const args = process.argv.slice(2);
const solicitud = args[0];

//console.log(args[0]);
//console.log(args[1]);

const crear = async (rut, nombre, curso, nivel) => {
    const query = {
        text: 'INSERT INTO estudiantes (rut, nombre, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;',
        values: [rut, nombre, curso, nivel],
    };
    try {
        const respuesta = await client.query(query);
        console.log(respuesta.rows);
        console.log(`Estudiante ${nombre} ingresado a BBDD`);
    }catch (e) {
        console.log(e);
    }finally {
        client.end()
    }
};

const consulta = async (rut) => {
    const query1 = { 
        text: 'SELECT * FROM estudiantes WHERE rut = $1;',
        values: [rut],
    };
    try {
        const respuesta = await client.query(query1);
        console.log('Los datos consultados son:');
        console.log(respuesta.rows);
    }catch (e) {
        console.log(e);
    }finally {
        client.end();
    }
};

const consultaBBDD = async () => {
    const query2 = { 
        text: 'SELECT * FROM estudiantes;',
        values: [],
    };
    try {
        const respuesta = await client.query(query2);
        console.log('Los estudiantes registrados son:');
        console.log(respuesta.rows);
    }catch (e) {
        console.log(e);
    }finally {
        client.end();
    }
};

const modificar = async (rut, nombre, curso, nivel) => {
    const query3 = {
        text: 'UPDATE estudiantes SET rut = $1, nombre = $2, curso = $3, nivel = $4 WHERE rut = $1',
        values: [rut, nombre, curso, nivel],
    };
    try {
        const respuesta = await client.query(query3);
        console.log(respuesta.rows);
        console.log(`Datos de estudiante ${nombre} modificado en BBDD`);
    }catch (e) {
        console.log(e);
    }finally {
        client.end();
    }
};

const borrar = async (rut) => {
    const query4 = { 
        text: 'DELETE FROM estudiantes WHERE rut = $1;',
        values: [rut],
    };
    try {
        const respuesta = await client.query(query4);
        console.log(`Los datos de estudiante RUT: ${rut} fueron eliminados`);
        console.log(respuesta.rows);
    }catch (e) {
        console.log(e);
    }finally {
        client.end();
    }
};


if (solicitud == 'crear') {
    crear(args[1], args[2], args[3], args[4]);
} else if (solicitud == 'consulta') {
    consulta(args[1]);
} else if(solicitud == 'consultaBBDD'){
    consultaBBDD()
} else if(solicitud == 'modificar') {
    modificar(args[1], args[2], args[3], args[4]);
} else if (solicitud == 'borrar') {
    borrar(args[1]);
}