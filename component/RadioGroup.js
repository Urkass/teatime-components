'use strict';

const { PropTypes } = require('react');
const RadioGroup = require('../view/RadioGroup');
const simplify = require('../mixin/simplify');

module.exports = simplify(
  RadioGroup,
  (styles, { size }) => ({
    styles: styles[size],
  }),
  {
    s: require('../style/radio-group/radio-group-s.css'),
    m: require('../style/radio-group/radio-group-m.css'),
    l: require('../style/radio-group/radio-group-l.css'),
  },
  {
    size: 'm',
  },
  {
    size: PropTypes.oneOf([
      's',
      'm',
      'l',
    ]),
  }
);