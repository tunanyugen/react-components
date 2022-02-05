import * as React from 'react';
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../../Model/ReactComponentElement';
import {Link} from "react-router-dom";

export interface ButtonProps extends ReactComponentElementProps {
    type?:"button"|"submit"|"reset",
    to?:string;
    tabIndex?:number;
    onClick?:React.MouseEventHandler<HTMLButtonElement|HTMLAnchorElement>;
    onBlur?:React.FocusEventHandler<HTMLButtonElement|HTMLAnchorElement>;
    onMouseDown?:React.MouseEventHandler<HTMLButtonElement|HTMLAnchorElement>;
}
 
export interface ButtonState extends ReactComponentElementState{
    
}
 
class Button extends ReactComponentElement<ButtonProps, ButtonState> {
    static defaultProps:ButtonProps = {
        type: "button",
        to:"",
        className: "",
        style: {},
        tabIndex: 0,
        onClick:()=>{},
        onBlur:()=>{},
        onMouseDown:()=>{}
    }
    constructor(props: ButtonProps) {
        super(props);
    }
    render() {
        if (this.props.to.length > 0){
            return (
                <Link
                    className={`react-component__button ${this.props.className}`}
                    style={this.props.style}
                    tabIndex={this.props.tabIndex}
                    onClick={this.props.onClick}
                    onBlur={this.props.onBlur}
                    onMouseDown={this.props.onMouseDown}
                    type={this.props.type}
                    to={this.props.to}
                >
                    {this.props.children}
                </Link>
            )
        }
        return (
            <button
                className={`react-component__button ${this.props.className}`}
                tabIndex={this.props.tabIndex}
                onClick={this.props.onClick}
                onBlur={this.props.onBlur}
                onMouseDown={this.props.onMouseDown}
                type={this.props.type}
            >
                {this.props.children}
            </button>
        );
    }
}
 
export default Button;