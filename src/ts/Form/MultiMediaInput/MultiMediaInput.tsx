import * as React from 'react';
import Lightbox, { LightBoxProps } from '../../Lightbox/Lightbox';
import mediaType from '../../Utilities/MediaType';
import NameValidator from '../../Utilities/NameValidator';
import translate from '../../Utilities/Translate';
import trueHeight from '../../Utilities/TrueHeight';
import Button from '../Button/Button';
import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';
import Input, { InputProps } from '../Input/Input';

export interface MultiMediaInputProps extends FormInputProps {
    placeholder?:string;
    CKFinder?:any;
    inputsProps?:InputProps[];
}
 
export interface MultiMediaInputState extends FormInputState{
    inputsProps:InputProps[];
    lightboxProps:LightBoxProps;
    height:number|"auto";
}
 
class MultiMediaInput extends FormInput<MultiMediaInputProps, MultiMediaInputState> {
    static defaultProps:MultiMediaInputProps = {
        placeholder: "",
        className: "",
        style: {},
        label: "",
        error: "",
        name: "",
        shouldRefresh: false,
        CKFinder: null,
        inputsProps: [],
    }
    private get _className(){
        return this.props.error.length > 0 ? "error" : "";
    }
    private _inputs:React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props: MultiMediaInputProps) {
        super(props);
        if (!NameValidator.isArray(this.props.name)){ throw `The name property must be an array (ends with "[]") \n Example: ${this.props.name}[]` }
        this.state = {
            inputsProps: this.props.inputsProps,
            lightboxProps: Lightbox.defaultProps,
            height: "auto",
        }
    }
    componentDidMount(): void {
        this.calculateHeight();
    }
    componentDidUpdate(prevProps: Readonly<MultiMediaInputProps>, prevState: Readonly<MultiMediaInputState>, snapshot?: any): void {
        if (prevProps.inputsProps != this.props.inputsProps){
            this.setState({inputsProps: this.props.inputsProps})
        }
        if (prevProps.inputsProps.length != this.props.inputsProps.length || prevState.inputsProps.length != this.state.inputsProps.length){
            this.calculateHeight();
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({ inputsProps: [] })
        }
    }
    render() { 
        return (
            <div
                className={`react-component__multi-media-input react-component__form__input ${this._className} ${this.props.className}`}
                style={this.props.style}
            >
                {this.renderLabel()}
                <div
                    ref={this._inputs}
                    className="react-component__multi-media-input__inputs"
                    style={{
                        height: this.state.height
                    }}
                >
                    {this.renderInputs()}
                </div>
                <div className="react-component__multi-media-input__buttons react-component__form__input__wrapper">
                    <Button
                        className="react-component__multi-media-input__browse"
                        onClick={() => { this.popup(this.onSelect) }}
                    >{translate(this.props.translations, "browse")}</Button>
                    <Button
                        className="react-component__multi-media-input__preview"
                        onClick={this.showLightBox}
                    >{translate(this.props.translations, "preview")}</Button>
                    <Button
                        className="react-component__multi-media-input__clear"
                        onClick={this.clearInputs}
                    >{translate(this.props.translations, "clear")}</Button>
                    <Button
                        className="react-component__multi-media-input__add"
                        onClick={this.addInput}
                    >+</Button>
                    <Error value={this.props.error} />
                </div>
                <Lightbox
                    hidden={this.state.lightboxProps.hidden}
                    medias={this.state.inputsProps.map((props) => {
                        return {
                            type: mediaType(props.value).type,
                            src: mediaType(props.value).src
                        }
                    })}
                    onClose={this.hideLightbox}
                />
            </div>
        );
    }
    renderInputs = () => {
        if (this.state.inputsProps.length < 1){
            return (
                <div
                    className="react-component__input"
                    onClick={() => { this.addInput() }}
                >{translate(this.props.translations, "click-to-create-new-input")}</div>
            )
        }
        return this.state.inputsProps.map((props, index) => {
            return (
                <div
                    key={`multi-media-input-${props.name}-${index}`}
                    className="react-component__form__input react-component__multi-media-input__input"
                >
                    <Input
                        {...props}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={(e) => {
                            let inputProps = [...this.state.inputsProps];
                            inputProps[index].value = e.target.value;
                            this.setState({
                                inputsProps: inputProps
                            })
                        }}
                    />
                    <Button
                        className="react-component__multi-media-input__input__remove"
                        onClick={() => { this.removeInput(index) }}
                    >-</Button>
                </div>
            )
        })
    }
    removeInput = (index:number) => {
        let props = [...this.state.inputsProps];
        props.splice(index, 1);
        this.setState({inputsProps: props});
    }
    addInput = () => {
        let props = [...this.state.inputsProps];
        props.push({...Input.defaultProps});
        this.setState({inputsProps: props});
    }
    clearInputs = () => {
        this.setState({inputsProps: []})
    }
    onSelect = (medias:string[]) => {
        let props = [...this.state.inputsProps];
        medias.forEach((media) => {
            props.push({
                name: this.props.name,
                value: media
            })
        })
        this.setState({inputsProps: props});
    }
    popup = (onSelect:(medias:string[]) => any) => {
        this.props.CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: (finder) => {
                finder.on("files:choose", function (evt) {
                    onSelect(evt.data.files.models.map((media) => {
                        return media.getUrl();
                    }));
                });
                finder.on("file:choose:resizedImage", function (evt) {
                    onSelect(evt.data.files.models.map((media) => {
                        return media.getUrl();
                    }));
                });
            }
        });
    }
    showLightBox = () => {
        let props = {...this.state.lightboxProps}
        props.hidden = false;
        this.setState({lightboxProps: props})
    }
    hideLightbox = () => {
        let props = {...this.state.lightboxProps}
        props.hidden = true;
        this.setState({lightboxProps: props})
    }
    calculateHeight = () => {
        this.setState({height: trueHeight(this._inputs.current)})
    }
}
 
export default MultiMediaInput;