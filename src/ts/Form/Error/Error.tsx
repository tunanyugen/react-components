import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../../Model/ReactComponentElement';

export interface ErrorProps extends ReactComponentElementProps{
    value?:string;
}
 
export interface ErrorState extends ReactComponentElementState{
    popupHidden:boolean;
}
 
class Error extends ReactComponentElement<ErrorProps, ErrorState> {
    static defaultProps:ErrorProps = {
        className: "",
        style: {},
        value: "",
    }
    private get _popupClassName(){
        return this.state.popupHidden ? "hide" : "";
    }
    constructor(props: ErrorProps) {
        super(props);

        this.state = {
            popupHidden: true,
        }
    }
    componentDidUpdate(prevProps: Readonly<ErrorProps>, prevState: Readonly<ErrorState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.forceUpdate();
        }
    }
    render() {
        if (this.props.value.length <= 0){ return "" }
        return (
            <div
                className={`react-component__error ${this.props.className}`}
                style={this.props.style}
                onPointerEnter={() => { this.setState({popupHidden: false}) }}
                onPointerLeave={() => { this.setState({popupHidden: true}) }}
            >
                <div className="react-component__error_icon"></div>
                <div className={`react-component__error__popup ${this._popupClassName}`}>{this.props.value}</div>
            </div>
        );
    }
}
 
export default Error;