import Error from "../Error/Error";
import FormInput, { FormInputProps, FormInputState } from "../FormInput";


export interface SliderProps extends FormInputProps{
    value:number;
    min:number;
    max:number;
    onChange?:React.ChangeEventHandler<HTMLInputElement>;
}
 
export interface SliderState extends FormInputState{
    value:number;
}
 
class Slider extends FormInput<SliderProps, SliderState> {
    static defaultProps: SliderProps = {
        min: 0,
        max: 100,
        value: 0,
        className: "",
        error: "",
        label: "",
        name: "",
        onChange: () => {},
        shouldRefresh: false,
        style: {},
        translations: {},
    }
    constructor(props: SliderProps) {
        super(props);

        this.state = {
            value: this.props.value
        }
    }
    componentDidUpdate(prevProps: Readonly<SliderProps>, prevState: Readonly<SliderState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.setState({value: this.props.value});
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({value: 0})
        }
    }
    render() { 
        return (
            <div
                className={`react-component__form__input react-component__slider ${this.props.className}`}
                style={this.props.style}
            >
                <div className="react-component__slider__label-wrapper">
                    {this.renderLabel()}
                    <div className="react-component__slider__value">{this.state.value}</div>
                </div>
                <div className="react-component__form__input__wrapper">
                    <input
                        className={`react-component__input ${this.props.className}`}
                        name={this.props.name}
                        value={this.state.value}
                        min={this.props.min}
                        max={this.props.max}
                        type="range"
                        onChange={(e) => {
                            this.props.onChange(e);
                            this.setState({value: parseInt(e.target.value)});
                        }}
                    />
                </div>
            </div>
        );
    }
}
 
export default Slider;