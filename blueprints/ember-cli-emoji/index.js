module.exports = {
  description: 'Emoji for Ember',
  normalizeEntityName: function() {},

  afterInstall: function() {
    this.addBowerPackageToProject('emojify', '~1.1.0');
  }
};
