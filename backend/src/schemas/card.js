const schema = {
  verbatim:{
    "low_first": "Card",
    "singularize": "card",
    "pluralize": "cards"
},
json:{
    name: {
        type: "String"
    },
    color: {
        type: "String"
    },
    img: {
        type: "String",
        required: true
    }
},
 structure:{
    name: {
        type: String
    },
    color: {
        type: String
    },
    img: {
        type: String,
        required: true
    }
},
 timestamps: true 
 
  } 

 module.exports = schema;