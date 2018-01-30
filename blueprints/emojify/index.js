module.exports = {
  description: 'Emojify',
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackageToProject('emojify.js', '~1.1.0');
  }
};
