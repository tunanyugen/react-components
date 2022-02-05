import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';

interface CheckBoxProps extends FormInputProps{
    value?:boolean;
    label?:string;
    onChange:(value:boolean)=>any
}
 
export interface CheckBoxState extends FormInputState{
    value:boolean;
}
 
class CheckBox extends FormInput<CheckBoxProps, CheckBoxState> {
    static defaultProps:CheckBoxProps = {
        value: false,
        label: "",
        className: "",
        style: {},
        error: "",
        name: "",
        onChange: () => {},
        shouldRefresh: false,
    }
    constructor(props: CheckBoxProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    componentDidUpdate(prevProps: Readonly<CheckBoxProps>, prevState: Readonly<CheckBoxState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.setState({value: this.props.value})
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({value: false})
        }
    }
    render() { 
        return (
            <div
                className={`react-component__form__input react-component__checkbox ${this.props.className}`}
                style={this.props.style}
            >
                {this.renderLabel()}
                <input
                    className="react-component__checkbox__input"
                    type="checkbox"
                    checked={this.state.value}
                    onChange={(e) => {
                        this.setState({value: e.target.checked}, () => {
                            this.props.onChange(this.state.value)
                        })
                    }}
                />
                <input hidden readOnly name={this.props.name} type="text" value={+this.state.value}/>
                <Error value={this.props.error}/>
            </div>
        );
    }
}
 
export default CheckBox;