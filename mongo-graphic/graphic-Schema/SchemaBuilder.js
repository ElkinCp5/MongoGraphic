class SchemaBuilder {

    constructor(baseSchema) {
      this.schema = baseSchema;
    }
  
    addField(name, opts) {
      this.schema[name] = {
        type: opts.type,
        required: opts.required || false
      }
      if(opts.default) {
        this.schema[name].default = opts.default;
      }
    }
  
    addValidatorFor(fieldName, obj) {
      this.schema[fieldName].validate = {
        validator: obj.validator,
        message: obj.errorMessage
      }
    }
  
    build() {
      return this.schema;
    }
  }
  
  module.exports = SchemaBuilder;