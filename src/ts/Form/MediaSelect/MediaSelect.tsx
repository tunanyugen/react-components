import Button from '../Button/Button';
import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';

export interface MediaSelectProps extends FormInputProps{
    images:string[];
    onSelect:(src:string) => any;
    value:string;
}
 
export interface MediaSelectState extends FormInputState{
    value:string;
}
 
class MediaSelect extends FormInput<MediaSelectProps, MediaSelectState> {
    static defaultProps: MediaSelectProps = {
        className: "",
        style: {},
        error: "",
        value: "",
        label: "",
        name: "",
        shouldRefresh: false,
        translations: {},
        images: [],
        onSelect: () => {}
    }
    private get _className(){ return this.props.error.length > 0 ? "error" : "" }
    constructor(props: MediaSelectProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    componentDidUpdate(prevProps: Readonly<MediaSelectProps>, prevState: Readonly<MediaSelectState>, snapshot?: any): void {
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
                className={`react-component__form__input react-component__media-select ${this._className} ${this.props.className}`}
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
                <div className="react-component__input react-component__media-select__wrapper">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
    renderItems = () => {
        return this.props.images.map((src, index) => {
            return (
                <Button
                    key={`media-select-image-${src}-${index}`}
                    className={`react-component__media-select__item ${this.state.value == src ? "selected" : ""}`}
                    onClick={(e) => { this.props.onSelect(src) }}
                >
                    <img src={src} onClick={(e) => { this.setState({value: src}) }}/>
                </Button>
            )
        })
    }
}
 
export default MediaSelect;