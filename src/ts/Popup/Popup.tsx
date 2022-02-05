import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from "../Model/ReactComponentElement";

export interface PopupProps extends ReactComponentElementProps{
    hidden: boolean;
    onClick?:React.MouseEventHandler<HTMLDivElement>;
}
 
export interface PopupState extends ReactComponentElementState{
    
}
 
class Popup extends ReactComponentElement<PopupProps, PopupState> {
    static defaultProps:PopupProps = {
        hidden: true,
        className: "",
        style: {},
        onClick:() => {}
    }
    constructor(props: PopupProps) {
        super(props);
    }
    private get _toggleClassName(){ return this.props.hidden ? "hide" : "show" }
    render() { 
        return (
            <div
                className={`react-component__popup ${this._toggleClassName} ${this.props.className}`}
                style={this.props.style}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        );
    }
}
 
export default Popup;