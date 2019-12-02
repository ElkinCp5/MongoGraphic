const schema = {
  nverbatim:{
    "low_first": "Employee",
    "singularize": "employee",
    "pluralize": "employees"
},
 structure:{
    eggs: {
        type: Number,
        min: [
            8,
            'Too few eggs'
        ],
        max: 16
    },
    bacon: {
        type: Number,
        required: [
            true,
            'Why no bacon?'
        ]
    },
    drink: {
        type: String,
        enum: [
            'Coffee',
            'Tea'
        ],
        required: function() { return this.drink > 3;}
    }
}
}
 module.exports = schema;