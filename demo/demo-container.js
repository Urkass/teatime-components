'use strict';

const { PropTypes } = require('react');
const { createTag, a, div, h1 } = require('../');
const cssModules = require('react-css-modules');
const styles = require('./demo-container.css');

function DemoContainer({ component, data, title }) {
  const content = data.map((line, i) => {
    const components = line.reduce((set, props) => set.concat(component(props), ' '), []);
    return div.apply(null, [{key: `_${title}${i}`, styleName: 'row'}].concat(components));
  });

  const anchor = title.toLowerCase();

  return div(null,
    h1({styleName: 'header'},
      a({className: 'anchor', name: anchor}),
      title,
      ' ',
      a({href: `#${anchor}`, styleName: 'hashLink'}, '#')
    ),
    content
  );
}

DemoContainer.defaultProps = {};

DemoContainer.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

module.exports = createTag(cssModules(DemoContainer, styles));
