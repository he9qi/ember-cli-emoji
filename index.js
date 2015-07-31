/* jshint node: true */
'use strict';

var path = require('path');

var _emojiConfig = {};
var _defaultEmojiConfig = {
  mode: 'sprites',
  tag_type: 'span',
  img_dir: 'images/emoji',
  ignore_emoticons: false,
  blacklist: {
    elements: ['script', 'textarea', 'a', 'pre', 'code'],
    classes: ['no-emojify']
  }
};


module.exports = {
  name: 'ember-cli-emoji',

  /**
   * Import javascript depending on the *mode*. We currently support
   * `sprite` and `data-uri` modes (NO basic image mode).
   */
  included: function(app, parentAddon) {
    this._super.included(app);

    var target = (parentAddon || app);

    target.import(target.bowerDirectory + '/emojify/dist/js/emojify.js');

    if (_emojiConfig.mode === 'sprites') {
      var destSpriteDir = 'images/sprites';
      var spritePath    = '/emojify/dist/images/sprites/';

      target.import(target.bowerDirectory + spritePath + 'emojify.png', {
        destDir: destSpriteDir
      });
      target.import(target.bowerDirectory + spritePath + 'emojify@2x.png', {
        destDir: destSpriteDir
      });
    }

  },

  /**
   * Allows custom configuration from `environment`
   */
  config: function (environment, baseConfig) {
    if ('emoji' in baseConfig) {
      if (!baseConfig.emoji) {
        _emojiConfig = false;
      } else {
        Object.keys(_defaultEmojiConfig).forEach(function (key) {
          _emojiConfig[key] = baseConfig.emoji.hasOwnProperty(key) ? baseConfig.emoji[key] : _defaultEmojiConfig[key];
        });
      }
    } else {
      _emojiConfig = _defaultEmojiConfig;
    }

    if (environment === 'development') {
      return {
        emoji: _emojiConfig,
        contentSecurityPolicy: {
          'script-src': "'self' 'unsafe-eval' 'unsafe-inline'"
        }
      };
    }

    return {
      emoji: _emojiConfig
    };
  },

  /**
   * Import style depending on the *mode*. We currently support
   * `sprite` and `data-uri` modes (NO basic image mode).
   */
  treeForStyles: function () {
    var emojiDataURIPath = path.join(this.app.bowerDirectory,
          'emojify/dist/css/data-uri/emojify.css'),
        emojiSpritesPath = path.join(this.app.bowerDirectory,
          'emojify/dist/css/sprites/emojify.css');

    if (_emojiConfig.mode === 'data-uri') {
      this.app.import(emojiDataURIPath);
    } else {
      this.app.import(emojiSpritesPath);
    }
  },

  /**
   * Setup `emojify` configuration inline
   */
  contentFor: function (name) {
    if (name === 'body-footer') {
      return '<script type="text/javascript">emojify.setConfig(' + JSON.stringify(_emojiConfig) +')</script>';
    }
  }

};
