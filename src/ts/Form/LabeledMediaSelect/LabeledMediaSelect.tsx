import Error from "../Error/Error";
import FormInput, { FormInputProps, FormInputState } from "../FormInput";
import LabeledMediaSelectItem, { LabeledMediaSelectItemProps } from "./LabeledMediaSelectItem";

export interface LabeledMediaSelectProps extends FormInputProps{
    items:LabeledMediaSelectItemProps[];
    value?:string;
    onSelect?:(src:string) => any;
}
 
export interface LabeledMediaSelectState extends FormInputState{
    value:string;
}
 
export default class LabeledMediaSelect extends FormInput<LabeledMediaSelectProps, LabeledMediaSelectState> {
    static defaultProps: LabeledMediaSelectProps = {
        items: [],
        className: "",
        error: "",
        label: "",
        name: "",
        value: "",
        shouldRefresh: false,
        style: {},
        translations: {},
        onSelect: () => {}
    }
    private get _className(){ return this.props.error.length > 0 ? "error" : "" }
    constructor(props: LabeledMediaSelectProps) {
        super(props);
        this.state = {
            ...this.state,
            value: this.props.value
        }
    }
    componentDidUpdate(prevProps: Readonly<LabeledMediaSelectProps>, prevState: Readonly<LabeledMediaSelectState>, snapshot?: any): void {
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
                className={`react-component__form__input react-component__labeled-media-select ${this._className} ${this.props.className}`}
                style={this.props.style}
            >
                <div className="react-component__form__input__wrapper">
                    {this.renderLabel()}
                    <input
                        hidden
                        readOnly
                        type="text"
                        name={this.props.name}
                        value={this.state.value}
                    />
                    <Error value={this.props.error} />
                </div>
                <div className="react-component__input react-component__labeled-media-select__wrapper">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
    renderItems = () => {
        return this.props.items.map((props, index) => {
            return (
                <LabeledMediaSelectItem
                    {...props}
                    key={`labeled-media-select-${props.label}-${index}`}
                    className={this.state.value == props.src ? "selected" : ""}
                    onClick={(src) => {
                        this.props.onSelect(src);
                        props.onClick(src);
                    }}
                />
            )
        })
    }
}