const schema = {
  verbatim:{
    "low_first": "Avion",
    "singularize": "avion",
    "pluralize": "avions"
},
 structure:{
    model: {
        type: String
    },
    color: {
        type: String
    },
    name: {
        type: String
    }
},
 timestamps: true 
 
  } 

 module.exports = schema;