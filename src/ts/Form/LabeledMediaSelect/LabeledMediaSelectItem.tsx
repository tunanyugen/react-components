import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from "../../Model/ReactComponentElement";
import Button from "../Button/Button";
import FormInput, { FormInputProps, FormInputState } from "../FormInput";

export interface LabeledMediaSelectItemProps extends ReactComponentElementProps{
    label:string;
    src:string;
    onClick?:(src:string) => any
}
 
export interface LabeledMediaSelectItemState extends ReactComponentElementState{
    
}
 
class LabeledMediaSelectItem extends ReactComponentElement<LabeledMediaSelectItemProps, LabeledMediaSelectItemState> {
    static defaultProps: LabeledMediaSelectItemProps = {
        label: "",
        src: "",
        className: "",
        style: {},
        onClick: () => {}
    }
    constructor(props: LabeledMediaSelectItemProps) {
        super(props);
    }
    render() { 
        return (
            <div
                className={`react-component__labeled-media-select__item ${this.props.className}`}
                style={this.props.style}
                onClick={(e) => { this.props.onClick(this.props.src) }}
            >
                <Button
                    className="react-component__labeled-media-select__item__image"
                >
                    <img src={this.props.src} />
                </Button>
                <p
                    className="react-component__labeled-media-select__item__label"
                >{this.props.label}</p>
            </div>
        );
    }
}

export default LabeledMediaSelectItem;