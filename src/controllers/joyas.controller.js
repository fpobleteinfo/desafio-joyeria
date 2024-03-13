import prepareHateoas from "../helpers/hateoas.js";
import { obtenerInventario, obtenerInventarioLimitOrder, obtenerInventarioFilter, obtenerJoyaPorId } from "../models/joya.model.js";
import { findError } from "../utils/utils.js"

// export const getInventario = async (req, res) => {
//     try {
//       const joyas = await obtenerInventario();
//       res.status(200).json({joyas: joyas})
//       //res.status(200).json(joyas);
//     } catch (error) {
//       res.status(500).json({ error: "No se pudo obtener" });
//       console.error("Error al procesar", error);
//     }
//   };

//   export const getInventarioLimit = async (req, res) => {
//     try {
//         const { limit } = req.query;
//         const joyas = await obtenerInventarioLimit(limit);
//         const stockTotal = await obtenerInventario();
//         res.status(200).json({cantidadJoyas: limit, stockTotal, joyas: joyas})

//     } catch (error) {
//         const errorFound = findError(error.code)
//         res.status(errorFound[0].status).json({error: errorFound[0].message})
//     } 
//   }

  export const getInventarioOrderLimit = async (req, res) => {
    try {
        const {order_by, limit, page } = req.query;
        const joyas = await obtenerInventarioLimitOrder(order_by, limit, page);
        const stockTotal = await obtenerInventario();
        const joyasHateoas = await prepareHateoas("joya", joyas)
        res.status(200).json({cantidadJoyas: limit, stockTotal, joyas: joyasHateoas})
    } catch (error) {
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error: errorFound[0].message})      
    }

  }

  export const getInventarioFilter = async (req, res) => {
    try {
        const parametrosQuery = req.query
        const joyas = await obtenerInventarioFilter(parametrosQuery);    
        const stockTotal = await obtenerInventario(); 
        res.status(200).json({cantidadJoyas: joyas.length, stockTotal, joyas: joyas})        
    } catch (error) {
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error: errorFound[0].message})             
    }
  }

  export const getJoyaId = async (req, res) => {
    try {
        const { id } = req.params;
        const joya = await obtenerJoyaPorId(id);
        res.status(200).json({joya: joya})          
    } catch (error) {
        const errorFound = findError(error.code)
        res.status(errorFound[0].status).json({error: errorFound[0].message})            
    }
  }