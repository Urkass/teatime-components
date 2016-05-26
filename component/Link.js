'use strict';

const { PropTypes } = require('react');
const Link = require('../view/Link');
const simplify = require('../mixin/simplify');

module.exports = simplify(
  Link,
  (styles, { size }) => ({styles: styles[size]}),
  {
    's': require('../style/link/link-s.css'),
    'm': require('../style/link/link-m.css'),
    'l': require('../style/link/link-l.css'),
    'xl': require('../style/link/link-xl.css'),
  },
  {
    size: 'm',
  },
  {
    size: PropTypes.oneOf([
      's',
      'm',
      'l',
      'xl',
    ]),
  }
);