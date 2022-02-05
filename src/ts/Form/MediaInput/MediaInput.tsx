import Lightbox, { LightBoxProps } from '../../Lightbox/Lightbox';
import mediaType from '../../Utilities/MediaType';
import translate from '../../Utilities/Translate';
import Button from '../Button/Button';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';
import Input, { InputProps } from '../Input/Input';

export interface MediaInputProps extends FormInputProps {
    placeholder?: string;
    inputProps?: InputProps;
    CKFinder?: any;
}

export interface MediaInputState extends FormInputState{
    inputProps: InputProps;
    lightboxProps: LightBoxProps;
}

class MediaInput extends FormInput<MediaInputProps, MediaInputState> {
    static defaultProps: MediaInputProps = {
        placeholder: "",
        className: "",
        style: {},
        label: "",
        error: "",
        name: "",
        shouldRefresh: false,
        inputProps: Input.defaultProps,
        CKFinder: null,
    }
    constructor(props: MediaInputProps) {
        super(props);
        this.state = {
            inputProps: this.props.inputProps,
            lightboxProps: Lightbox.defaultProps,
        }
    }
    componentDidUpdate(prevProps: Readonly<MediaInputProps>, prevState: Readonly<MediaInputState>, snapshot?: any): void {
        if (prevProps.inputProps.value != this.props.inputProps.value) {
            this.setState({ inputProps: this.props.inputProps })
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.setState({
                inputProps: {
                    ...this.state.inputProps,
                    value: ""
                }
            })
        }
    }
    render() {
        return (
            <div
                className={`react-component__form__input react-component__media-input ${this.props.className}`}
                style={this.props.style}
            >
                {this.renderLabel()}
                <div className="react-component__media-input__wrapper">
                    <Input
                        {...this.state.inputProps}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        error={this.props.error}
                        onChange={(e) => {
                            this.setState({
                                inputProps: { ...this.state.inputProps, value: e.target.value }
                            })
                        }}
                    />
                    <Button
                        className="react-component__media-input__browse"
                        onClick={() => { this.popup(this.onSelect) }}
                    >{translate(this.props.translations, "browse")}</Button>
                    <Button
                        className="react-component__media-input__preview"
                        onClick={this.showLightBox}
                    >{translate(this.props.translations, "preview")}</Button>
                </div>
                <Lightbox
                    {...this.state.lightboxProps}
                    medias={[{
                        type: mediaType(this.state.inputProps.value).type,
                        src: mediaType(this.state.inputProps.value).src
                    }]}
                    onClose={this.hideLightbox}
                />
            </div>
        );
    }
    onSelect = (media: string) => {
        let input = { ...this.state.inputProps };
        input.value = media;
        this.setState({ inputProps: input });
    }
    popup = (onSelect: (media: string) => any) => {
        this.props.CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: (finder) => {
                finder.on("files:choose", function (evt) {
                    onSelect(evt.data.files.models[0].getUrl());
                });
                finder.on("file:choose:resizedImage", function (evt) {
                    onSelect(evt.data.files.models[0].getUrl());
                });
            }
        });
    }
    showLightBox = () => {
        let props = { ...this.state.lightboxProps }
        props.hidden = false;
        this.setState({ lightboxProps: props })
    }
    hideLightbox = () => {
        let props = { ...this.state.lightboxProps }
        props.hidden = true;
        this.setState({ lightboxProps: props })
    }
}

export default MediaInput;