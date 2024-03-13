import pool from "../../db/conectionDB.js";
import format from "pg-format";
import createQuery from "../helpers/filter.js";

//es para obtener el total de registros
export const obtenerInventario = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM inventario");
    return rows.length;
  } catch (error) {
    console.error("Error al obtener el inventario:", error);
    throw error;
  }
};

// export const obtenerInventarioLimit = async (limit = 10) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM inventario LIMIT $1", [
//       limit,
//     ]);
//     return rows;
//   } catch (error) {
//     console.error("Error al obtener el inventario:", error);
//     throw error;
//   }
// };

export const obtenerInventarioLimitOrder = async (
  order_by = "stock_ASC",
  limit = 10,
  page = 0
) => {
  const [attribute, direction] = order_by.split("_");
  const offset = page * limit;
  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    attribute,
    direction,
    limit,
    offset
  );
  const result = await pool.query(formattedQuery);
  return result.rows;
};

//usando filter
// export const obtenerInventarioFilter = async (filters) => {
//   const { query, values } = createQuery("inventario", filters);
//   const result = await pool.query(query, values);
//   return result.rows;
// }

//metodo de la guia

export const obtenerInventarioFilter = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filtros = [];
  let valores = [];

  if (precio_max) {
    filtros.push(`precio <= $${valores.length + 1}`);
    valores.push(precio_max);
  }
  if (precio_min) {
    filtros.push(`precio >= $${valores.length + 1}`);
    valores.push(precio_min);
  }
  if (categoria) {
    filtros.push(`categoria = $${valores.length + 1}`);
    valores.push(categoria);
  }
  if (metal) {
    filtros.push(`metal = $${valores.length + 1}`);
    valores.push(metal);
  }

  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }

  const { rows: inventario } = await pool.query(consulta, valores);
  return inventario;
};



export const obtenerJoyaPorId = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM inventario WHERE id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error al obtener el inventario:", error);
    throw error;
  }
};
