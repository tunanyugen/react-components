import * as React from 'react';
import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';

export interface InputProps extends FormInputProps{
    value?:string;
    type?:React.HTMLInputTypeAttribute;
    placeholder?:string;
    onChange?:React.ChangeEventHandler<HTMLInputElement>;
    onFocus?:React.FocusEventHandler<HTMLInputElement>;
    onBlur?:React.FocusEventHandler<HTMLInputElement>;
    onPointerLeave?:React.PointerEventHandler<HTMLDivElement>;
    onFinishedTyping?:React.ChangeEventHandler<HTMLInputElement>;
}
 
export interface InputState extends FormInputState {
    value:string;
}
 
class Input extends FormInput<InputProps, InputState> {
    static defaultProps:InputProps = {
        name: "",
        label: "",
        error: "",
        className: "",
        style: {},
        value: "",
        type: "text",
        placeholder: "",
        shouldRefresh: false,
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onPointerLeave: () => {},
        onFinishedTyping: () => {}
    }
    private _changeTimeout:NodeJS.Timeout;
    private get _className(){
        return this.props.error.length > 0 ? "error" : "";
    }
    constructor(props: InputProps) {
        super(props);
        this.state = {
            value: this.props.value,
        }
    }
    componentDidUpdate(prevProps: Readonly<InputProps>, prevState: Readonly<InputState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.setState({value: this.props.value});
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({value: ""})
        }
    }
    render() { 
        return (
            <div
                className={`react-component__form__input ${this._className} ${this.props.className}`}
                style={this.props.style}
                onPointerLeave={this.props.onPointerLeave}
            >
                {this.renderLabel()}
                <div className="react-component__form__input__wrapper">
                    <input
                        className={`react-component__input ${this.props.className}`}
                        name={this.props.name}
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        type={this.props.type}
                        onChange={(e) => {
                            if (this._changeTimeout){ clearTimeout(this._changeTimeout) }
                            this._changeTimeout = setTimeout(() => {
                                this.props.onFinishedTyping(e);
                            }, 300);
                            this.props.onChange(e);
                            this.setState({value: e.target.value});
                        }}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                    />
                    <Error value={this.props.error} />
                </div>
            </div>
        );
    }
}
 
export default Input;