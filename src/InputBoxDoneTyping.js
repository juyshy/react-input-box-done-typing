
import React, { PropTypes, Component } from 'react'

let typingTimer

class InputBoxDoneTyping extends Component {

  constructor(props) {
    super(props)
    this.state = {value: ''}

  }

  setDisplayValue(value){
    let dispValue = value.toString().replace(".",",")
    this.setState({value: dispValue}) 
  }

  componentWillReceiveProps(nextProps){
    const nextValue =  nextProps.value
    if(nextValue != null) {
      this.setDisplayValue( nextValue) 
    }
  }

   doneTyping(value){
    this.props.doneTyping(value)
  }
 

  getStateValue(){
    let newvalue=this.state.value
    newvalue = parseFloat(newvalue.replace(",","."))
    return newvalue
  }

  handleOnKeyDown(e) {
    clearTimeout(typingTimer)
  }

  render() {

    const { onChange, id, doneTyping, placeholder , minvalue , maxvalue } = this.props
    let { step  } = this.props
    if (step == undefined){
      step = 1
    }
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
          const value = e.target.value
          this.setDisplayValue( value) 
          if (onChange) {
            onChange(value)
          }
        }}
        onKeyUp={(e) => {
          if (e.keyCode == 38 || e.keyCode == 40) {
            let newvalue = this.getStateValue()
            if (isNaN(newvalue)) {
              if (e.keyCode == 38) {
                newvalue = minvalue
              } else {
                newvalue = maxvalue
              }

            } else {
              step = parseFloat(step)
              if (e.keyCode == 38) {
                newvalue += step
              } else {
                newvalue -= step
              }
              if (newvalue< minvalue) {
                newvalue=maxvalue
              }
              if (newvalue> maxvalue){
                newvalue=minvalue
              }
            }
            let precision = 0
            if (step.toString().indexOf(".") != -1) {
              precision = step.toString().split(".")[1].length
            }
            newvalue = newvalue.toFixed(precision)
            this.setDisplayValue(newvalue)
            doneTyping(newvalue)
          } else {
            let {doneTypingInterval} = this.props
            clearTimeout(typingTimer)
            const value = e.target.value
            typingTimer = setTimeout(() => { doneTyping(value) }, doneTypingInterval)
          }
        }}
        onKeyDown={e => this.handleOnKeyDown(e)}
      />
    )
  }
}

InputBoxDoneTyping.defaultProps = {
  autoComplete: 'on',
  doneTypingInterval: 500,
}

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
}

export default InputBoxDoneTyping
