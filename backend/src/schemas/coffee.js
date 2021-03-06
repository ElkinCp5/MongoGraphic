const schema = {
    verbatim:{
        "low_first": "Coffee",
        "singularize": "coffee",
        "pluralize": "coffees"
    },
    json:{
        eggs: {
            type: "Number",
            min: [
                8,
                'Too few eggs'
            ],
            max: 16
        },
        bacon: {
            type: "Number",
            required: [
                true,
                'Why no bacon?'
            ]
        },
        drink: {
            type: "String",
            enum: [
                'Coffee',
                'Tea'
            ],
            required: "function() { return this.drink > 3;}"
        }
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