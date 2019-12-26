const schema = {
  verbatim:{
    "low_first": "User",
    "singularize": "user",
    "pluralize": "users"
},
 structure:{
    name: String,
    lastName: String,
    age: Number,
    salary: String,
    hour: String,
    phone: Number,
    address: String
},
 timestamps: true 
 
  } 

 module.exports = schema;