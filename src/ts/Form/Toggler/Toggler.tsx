import FormInput, { FormInputProps, FormInputState } from '../FormInput';

export interface TogglerProps extends FormInputProps{
    type?:"button"|"reset"|"submit";
    value?:boolean;
    onChange?:(value:boolean)=>any;
}
 
export interface TogglerState extends FormInputState{
    value:boolean;
}
 
class Toggler extends FormInput<TogglerProps, TogglerState> {
    static defaultProps:TogglerProps = {
        error: "",
        label: "",
        name: "",
        value: false,
        className: "",
        style: {},
        shouldRefresh: false,
        onChange: () => {},
        type: "button",
    }
    constructor(props: TogglerProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    componentDidUpdate(prevProps: Readonly<TogglerProps>, prevState: Readonly<TogglerState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.setState({value: this.props.value});
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({value: false})
        }
    }
    render() { 
        return (
            <button
                className={`react-component__form__input react-component__toggler ${this.state.value ? "active" : ""} ${this.props.className}`}
                style={this.props.style}
                onClick={(e) => {
                    this.setState({value: !this.state.value}, () => {
                        this.props.onChange(this.state.value);
                    })
                }}
                type={this.props.type}
            >
                <input hidden readOnly name={this.props.name} type="text" value={+this.state.value} />
                <div className="react-component__toggler__handle"></div>
            </button>
        );
    }
}
 
export default Toggler;