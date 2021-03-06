'use strict';

const {Component} = require('react');
const {omitNonStandardAttrs, genericName} = require('../lib/util');
const {noop} = require('../lib/dash');
const PropTypes = require('prop-types');
const React = require('react');
const cc = require('classnames');

const cssModules = {
  'action-l': require('../style/link/link-action-l.css'),
  'action-m': require('../style/link/link-action-m.css'),
  'action-s': require('../style/link/link-action-s.css'),
  'link-l': require('../style/link/link-l.css'),
  'link-m': require('../style/link/link-m.css'),
  'link-s': require('../style/link/link-s.css'),
  'normal-l': require('../style/link/link-normal-l.css'),
  'normal-m': require('../style/link/link-normal-m.css'),
  'normal-s': require('../style/link/link-normal-s.css'),
};

class Link extends Component {
  css = tokenName => genericName(this.props, tokenName)

  focus = noop

  _onClick = e => {
    if (!this.props.disabled) this.props.onClick(e);
    else e.preventDefault();
  }

  render() {
    const {
      children,
      className,
      disabled,
      download,
      href,
      id,
      target,
      type,
    } = this.props;

    const {css} = this;

    return (
      <a
        {...omitNonStandardAttrs(this.props)}
        className={cc(css('control'), {
          [css('disabled')]: disabled,
        }, className)}
        download={download}
        href={href}
        id={id}
        onClick={this._onClick}
        target={target}
        type={type}>
        {children}
      </a>
    );
  }
}

Link.defaultProps = {
  onClick: noop,
  size: 'm',
  styles: cssModules,
  theme: 'link',
};

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  download: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  href: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    'l',
    'm',
    's',
  ]),
  styles: PropTypes.object,
  target: PropTypes.string,
  theme: PropTypes.oneOf([
    'action',
    'link',
    'normal',
  ]),
  type: PropTypes.string,
};

module.exports = Link;
