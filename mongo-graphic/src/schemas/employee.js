var schema={
    verbatim: {
        low_first: Employee,
        singularize: employee,
        pluralize: employees
    },
    structure: {
        name: String,
        lastName: String,
        age: Number,
        salary: String,
        phone: String,
        address: String,
        create_at: Date,
        update_at: Date
    }
}
 module.exports = schema;