const schema = {
  verbatim:{
    "low_first": "Client",
    "singularize": "client",
    "pluralize": "clients"
},
 structure:{
    name: String,
    lastName: String,
    age: Number,
    company: String,
    phone: String,
    address: String
}
}
 module.exports = schema;