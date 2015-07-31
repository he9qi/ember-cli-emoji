module.exports = {
  description: 'Emojify',
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('emojify', '~1.1.0');
  }
};
