# Emoji for Ember
[![Code Climate][climate-badge]](climate-badge-url)
[![Build Status][travis-badge]][travis-badge-url]


This Ember CLI addon for [Emojify](http://hassankhan.me/emojify.js).


![Emojify Icons](https://cloud.githubusercontent.com/assets/29342/8999460/78e3c256-36ef-11e5-95a8-15a2cd82414c.jpg)


## Installation
```sh
ember install ember-cli-emoji
```

## Setup
Add your *Emoji* configuration to your app's config

```javascript
// default config
mode: 'sprites',
tag_type: 'span',
img_dir: 'images/emoji',
ignore_emoticons: false,
blacklist: {
  elements: ['script', 'textarea', 'a', 'pre', 'code'],
  classes: ['no-emojify']
}

// config/environment.js
ENV.emoji = {
  tag_name: "div"
};
```

## Usage

### Emoji Icon Helper Usage
```handlebars
{{emoji-icon 'smiley'}}
```

### Emoji Tag Usage
```handlebars
{{#emoji-tag}}
  Hello :smiley:
{{/emoji-tag}}
```

## Contributing
PRs welcome!

[travis-badge]: https://travis-ci.org/he9qi/ember-cli-emoji.svg
[travis-badge-url]: https://travis-ci.org/he9qi/ember-cli-emoji
[climate-badge]: https://codeclimate.com/github/he9qi/ember-cli-emoji/badges/gpa.svg
[climate-badge-url]: https://codeclimate.com/github/he9qi/ember-cli-emoji
