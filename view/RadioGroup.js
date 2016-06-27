'use strict';

const { Component, PropTypes } = require('react');
const { bind, indexOf } = require('../tool/component');
const { generateId, hasUniqueValues, mapKey, mapKeyBasedOnPos } = require('../tool/identity');
const { noop } = require('../tool/func');
const { styleName } = require('../tool/className');
const RadioButton = require('./RadioButton');
const React = require('react');

class RadioGroup extends Component {
  constructor(props) {
    super(props);

    // @todo add assertion for defaultValue
    this.controlled = props.value !== undefined;
    this.updateKeyMapper(props.hasUniqValues, props.options);

    const value = props.value || props.defaultValue;

    // @todo make assertion for single property
    this.state = {
      prefix: generateId(),
      selected: indexOf(props.options, value),
    };

    bind(this, 'onChange');
  }

  componentWillReceiveProps({ hasUniqValues, options, value }) {
    if (this.controlled) {
      this.setState({selected: indexOf(options, value)});
    }

    if (this.props.hasUniqValues !== hasUniqValues) {
      this.updateKeyMapper(hasUniqValues, options);
    }
  }

  onChange(e, _, tc) {
    if (!this.controlled) {
      this.setState({selected: tc});
    }

    this.props.onChange(e, _);
  }

  /**
   * @param {boolean} hasUniqValues
   * @param {object[]} options
   */
  updateKeyMapper(hasUniqValues, options) {
    this.mapKey = !(hasUniqValues && hasUniqueValues(options))
      ? mapKeyBasedOnPos
      : mapKey;
  }

  render() {
    return (
      <div
        {...this.props}
        className={styleName(this.props)}
        onChange={undefined}>
        {this.renderOptions()}
      </div>
    );
  }

  renderOptions() {
    const { disabled: globalDisabled, name, options, styles } = this.props;
    const { prefix, selected } = this.state;

    return options.map((option, i) => (
      <RadioButton
        {...option}
        checked={selected === i}
        disabled={globalDisabled || option.disabled}
        key={this.mapKey(prefix, option.value, i)}
        name={name}
        onChange={this.onChange}
        styles={styles}
        tc={i}/>
    ));
  }
}

RadioGroup.defaultProps = {
  hasUniqValues: true,
  onChange: noop,
  styleName: 'container',
  styles: {},
};

RadioGroup.propTypes = {
  hasUniqValues: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  styleName: PropTypes.string,
  styles: PropTypes.shape({
    container: PropTypes.string,
    control: PropTypes.string.isRequired,
    native: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
  }),
};

module.exports = RadioGroup;
