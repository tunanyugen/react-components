import * as React from 'react';
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../Model/ReactComponentElement';

export interface FormInputProps extends ReactComponentElementProps{
    shouldRefresh?:boolean;
    name?:string;
    label?:string;
    error?:string;
    translations?:any;
}
 
export interface FormInputState extends ReactComponentElementState{
    
}

export interface FormInputValue{
    id:string;
    value:string;
}
 
class FormInput<P extends FormInputProps, S extends FormInputState> extends ReactComponentElement<P, S> {
    static defaultProps:FormInputProps = {
        className: "",
        style: {},
        error: "",
        label: "",
        name: "",
        shouldRefresh: false,
        translations:[],
    }
    constructor(props: P) {
        super(props);
    }
    renderLabel = () => {
        if (this.props.label.length <= 0){ return "" }
        return (
            <small
                className={`react-component__form__input__label ${this.props.className}`}
                style={this.props.style}
            >{this.props.label ? `${this.props.label}` : ""}</small>
        )
    }
}
 
export default FormInput;