const schema = {
  verbatim:{
    "low_first": "Client",
    "singularize": "client",
    "pluralize": "clients"
  },
  json:{
    name: 'String',
    lastName: 'String',
    age: 'Number',
    company: 'String',
    phone: 'String',
    mobile: 'String',
    address: 'String'
  },
  structure:{
      name: String,
      lastName: String,
      age: Number,
      company: String,
      phone: String,
      mobile: String,
      address: String
  }
}
 module.exports = schema;