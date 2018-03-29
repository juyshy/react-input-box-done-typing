
import React, { PropTypes, Component } from 'react';

let typingTimer;

class InputBoxDoneTyping extends Component {

  constructor(props) {
    super(props)
    this.state = {value: ''}

  }

  componentWillReceiveProps(nextProps){
    const nextValue =  nextProps.value
    if(nextValue != null) {
      this.setState({value: nextValue}) 
    }
  }

   doneTyping(value){
    this.props.doneTyping(value);
  };

   handleOnKeyUp(e){
    clearTimeout(typingTimer);
    const value = e.target.value;
    typingTimer = setTimeout(() => { doneTyping(value); }, this.props.doneTypingInterval);
  };

   handleOnKeyDown()  {
    clearTimeout(typingTimer);
  };
  render() {

    const { onChange, id, doneTyping,placeholder, step } = this.props
    return (
      <input
        type="text"
        id={ id}
        value={this.state.value}
        //className={this.props.className}
        placeholder={ placeholder}
        maxLength={this.props.maxLength}
        step={step}
        defaultValue={this.props.defaultValue}
        autoComplete={this.props.autoComplete}
        onChange={e => {
          const value = e.target.value;
          this.setState({value: value}) 
          if (onChange) {
            onChange(value);
          }
        }}
        onKeyUp={(e) => {
          clearTimeout(typingTimer);
          const value = e.target.value;
          typingTimer = setTimeout(() => { doneTyping(value); }, this.props.doneTypingInterval);
        }}
        onKeyDown={this.handleOnKeyDown}
      />
    )
  }
}

InputBoxDoneTyping.defaultProps = {
  autoComplete: 'on',
  doneTypingInterval: 500,
};

InputBoxDoneTyping.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  onChange: PropTypes.func,
  doneTyping: PropTypes.func.isRequired,
  doneTypingInterval: PropTypes.number,
};

export default InputBoxDoneTyping;
