const schema = {
  verbatim:{
    "low_first": "Bus",
    "singularize": "bus",
    "pluralize": "buses"
},
 structure:{
    name: {
        type: String
    },
    color: {
        type: String
    },
    marc: {
        type: String
    }
},
 timestamps: true 
 
  } 

 module.exports = schema;