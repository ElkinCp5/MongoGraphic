const schema = {
  verbatim:{
    "low_first": "Player",
    "singularize": "player",
    "pluralize": "players"
},
 structure:{
    name: String,
    lastName: String,
    age: Number,
    salary: String,
    phone: String,
    address: String
},
 timestamps: true 
 
  } 

 module.exports = schema;