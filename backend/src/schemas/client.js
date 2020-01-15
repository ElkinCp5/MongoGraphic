const schema = {
  verbatim:{
    "low_first": "Client",
    "singularize": "client",
    "pluralize": "clients"
  },
  json:{
    name: {
      type:'String',
      required: true
    },
    lastName: {
      type:'String'
    },
    age: {
      type:'Number'
    },
    company: {
      type:'String'
    },
    phone: {
      type:'String'
    },
    mobile: {
      type:'String'
    },
    address: {
      type:'String'
    }
  },
  structure:{
      name: {
        type:String
      },
      lastName: {
        type:String
      },
      age: Number,
      company: {
        type:String
      },
      phone: {
        type:String
      },
      mobile: {
        type:String
      },
      address: {
        type:String
      }
  }
}
 module.exports = schema;