# mongoose-throw-unselected

Throws an error whenever you access a field on a mongoose document that is not selected

## Usage

```javascript
const mongooseThrowUnselected = require('mongoose-throw-unselected');
```



# examples

## It throws an error if accessing a field that is not included in the projection


If you explicitly exclude a field (like via `.select()` on a query) and you access that
field, this plugin will throw an error. This plugin adds a custom setter on each field that checks
if the [field is included by checking `isSelected()`](http://mongoosejs.com/docs/api.html#document_Document-isSelected).


```javascript

    const schema = new mongoose.Schema({
      name: {
        first: String,
        last: String,
      },
      age: Number
    });

    schema.plugin(mongooseThrowUnselected);

    const Model = mongoose.model('Person', schema);

    return Model.create({ name: { first: 'Valeri', last: 'Karpov' }, age: 28 }).
      // Explicitly exclude 'name.first'
      then(() => Model.findOne().select({ 'name.first': false })).
      then(doc => {
        assert.throws(() => doc.name.first);
        assert.doesNotThrow(() => doc.name);
        assert.equal(doc.name.last, 'Karpov');
        assert.equal(doc.age, 28);
      });
  
```