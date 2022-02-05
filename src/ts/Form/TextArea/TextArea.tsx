import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';

export interface TextAreaProps extends FormInputProps{
    value?:string;
    placeholder?:string;
}
 
export interface TextAreaState extends FormInputState{
    value:string;
}
 
class TextArea extends FormInput<TextAreaProps, TextAreaState> {
    static defaultProps: TextAreaProps = {
        error: "",
        label: "",
        name: "",
        value: "",
        placeholder: "",
        className: "",
        shouldRefresh: false,
        translations: {},
    }
    private get _className(){
        return this.props.error.length > 0 ? "error" : "";
    }
    constructor(props: TextAreaProps) {
        super(props);
        this.state = {
            ...this.state,
            value: this.props.value
        }
    }
    componentDidUpdate(prevProps: Readonly<TextAreaProps>, prevState: Readonly<TextAreaState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.setState({value: this.props.value})
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({value: ""})
        }
    }
    render() { 
        return (
            <div className={`react-component__form__input react-component__text-area ${this._className} ${this.props.className}`}>
                <div className="react-component__form__input__wrapper">
                    {this.renderLabel()}
                    <Error value={this.props.error} />
                </div>
                <div className="react-component__form__input__wrapper">
                    <textarea
                        className={`react-component__input`}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={(e) => { this.setState({value: e.target.value}) }}
                    ></textarea>
                </div>
            </div>
        );
    }
}
 
export default TextArea;