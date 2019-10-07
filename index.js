/* jshint node: true */
'use strict';

const path = require('path'),
      resolve = require('resolve').sync;

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

function getEmojify(target) {
  const basedir = (target.project || {}).root,
        main = resolve('emojify.js', { basedir });

  return {
    main,
    emojifyRoot: (/.*\/emojify\.js\//i.exec(main)[0] || '').replace(basedir + '/', '')
  }
}

module.exports = {
  name: 'ember-cli-emoji',

  /**
   * Import javascript depending on the *mode*. We currently support
   * `sprite` and `data-uri` modes (NO basic image mode).
   */
  included (app, parentAddon) {
    this._super.included(app);

    const target = parentAddon || app,
          { main, emojifyRoot } = getEmojify(target);

    // emojify entry point (dist/js/emojify.js)
    target.import(main);

    if (_emojiConfig.mode === 'sprites') {
      const destDir = 'images/sprites',
            spritePath = path.join(emojifyRoot, 'dist/images/sprites/');

      target.import(path.join(spritePath, 'emojify.png'), { destDir });
      target.import(path.join(spritePath, 'emojify@2x.png'), { destDir });
    }
  },

  /**
   * Allows custom configuration from `environment`
   */
  config (environment, baseConfig) {
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
  treeForStyles () {
    const { emojifyRoot } = getEmojify(this.app),
          mode = _emojiConfig.mode === 'data-uri' ? 'data-uri' : 'sprites';

    this.app.import(path.join(emojifyRoot, 'dist/css', mode, 'emojify.css'));
  },

  /**
   * Setup `emojify` configuration inline
   */
  contentFor (name) {
    if (name === 'body-footer') {
      return '<script type="text/javascript">emojify.setConfig(' + JSON.stringify(_emojiConfig) +')</script>';
    }
  }
};
