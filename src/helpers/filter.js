const createQuery = (entity, filters) => {

const table = entity.toLowerCase();
let query = `SELECT * FROM ${table} WHERE 1 = 1`;

const filterEntries = Object.entries(filters);
const values = [];
//for para recorrer los distintos AND 
for (const [key, value] of filterEntries){
    query += `AND ${key} = $${values.length + 1}`; //doble $$ para sanear la variable y le vamos asignado un +1 a los parametros
    values.push(value);
}
return {query, values};

}

export default createQuery