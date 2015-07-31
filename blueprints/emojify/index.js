module.exports = {
  description: 'Emojify',
  normalizeEntityName: function() {},

  afterInstall: function() {
    this.addBowerPackageToProject('emojify', '~1.1.0');
  }
};
