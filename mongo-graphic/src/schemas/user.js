var schema={
    verbatim: {
        low_first: User,
        singularize: user,
        pluralize: users
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