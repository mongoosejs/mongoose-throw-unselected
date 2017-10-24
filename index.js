module.exports = function(schema) {
  schema.eachPath(function(key, path) {
    path.get(function(v) {
      if (!this.isSelected(key)) {
        throw new Error('Accessing unselected key `' + key + '`');
      }
      return v;
    });
  });
};
