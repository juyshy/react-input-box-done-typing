import React, {PropTypes} from 'react';

const InputBoxDoneTyping = (props) => {
  let typingTimer;
  let before = props.inputDefaultValue || '';

  const handleOnChange = (e) => {
    if (props.inputOnChange) {
      const value = e.target.value;
      props.inputOnChange(value);
    }
  }

  const handleOnKeyUp = (e) => {
    const value = e.target.value;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => { doneTyping(value); }, props.doneTypingInterval || 500);
  }

  const handleOnKeyDown = () => {
    clearTimeout(typingTimer);
  }

  const doneTyping = (value) => {
    if (value.toLowerCase() !== before.toLowerCase()) {
      before = value;
      props.inputDoneTyping(value);
    }
  }

  return (
    <input type="text"
      className={props.inputClassName}
      defaultValue={props.inputDefaultValue}
      onChange={handleOnChange}
      onKeyUp={handleOnKeyUp}
      onKeyDown={handleOnKeyDown}
      />
  );
}

InputBoxDoneTyping.propTypes = {
  inputClassName: PropTypes.string,
  inputOnChange: PropTypes.func,
  inputDefaultValue: PropTypes.string,
  doneTypingInterval: PropTypes.number,
  inputDoneTyping: PropTypes.func.isRequired
};

export default InputBoxDoneTyping;