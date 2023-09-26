const express = require('express')

const router = express.Router();

//GET
router.get('/', (req, res)=>{
  
  res.json({
    msg: "Respuesta del GET",
    
  })
})


//GET BY ID
router.get('/:id', (req, res)=>{
  
  const { id } = req.params; 
  
  res.json({
    msg: "Respuesta del GET",
    id
  })
})

//POST
router.post('/', (req, res)=>{
  const { body } = req;

  res.json({
    msg: "Respuesta del POST",
    body
  })
})

//PUT
router.put('/:id', (req, res)=>{
  const { id } = req.params
  const { body } = req 

  res.json({
    msg: "Respuesta del PUT",
    body
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  res.json({
    msg: "Respuesta del DELETE"
  })
})


module.exports = router;