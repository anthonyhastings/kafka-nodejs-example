const avro = require('avsc');

const avroSchema = {
  name: 'SaleType',
  type: 'record',
  fields: [
    {
      name: 'saleDate',
      type: {
        type: 'long',
        logicalType: 'timestamp-millis'
      }
    },
    {
      name: 'total',
      type: 'double'
    }
  ]
};

const type = avro.parse(avroSchema)

module.exports = type;