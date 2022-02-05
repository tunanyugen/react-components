import * as React from 'react';
import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState } from '../FormInput';
const DecoupledEditor = require("@tunanyugen/ckeditor5");

export interface CKEditorProps extends FormInputProps{
    placeholder?:string;
    value?:string;
    CKEditorConfig?:any;
    onChange?:(content:string) => any;
}
 
export interface CKEditorState extends FormInputState{
    value:string;
}
 
class CKEditor extends FormInput<CKEditorProps, CKEditorState> {
    static defaultProps:CKEditorProps = {
        className: "",
        label: "",
        error: "",
        name: "",
        placeholder: "",
        value: "",
        shouldRefresh: false,
        CKEditorConfig: {},
        onChange: () => {}
    }
    private _editor:any;
    private _updateValueTimeout:NodeJS.Timeout;
    private _toolbar:React.RefObject<HTMLDivElement> = React.createRef();
    private _content:React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props: CKEditorProps) {
        super(props);
        this.state = {
            value: this.props.value,
        }
    }
    componentDidMount(){
        this.renderEditor();
    }
    componentDidUpdate(prevProps: Readonly<CKEditorProps>, prevState: Readonly<CKEditorState>, snapshot?: any): void {
        if (prevProps.value != this.props.value){
            this.setState({value: this.props.value}, () => {
                this._editor.setData(this.state.value);
            })
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this._editor.setData("");
            this.setState({value: ""});
        }
    }
    render() { 
        return (
            <div
                className={`react-component__form__input react-component__ckeditor ${this.props.className}`}
            >
                <div className="react-component__form__input__wrapper">
                    {this.renderLabel()}
                    <Error value={this.props.error} />
                </div>
                <div ref={this._toolbar} className="react-component__ckeditor__toolbar"></div>
                <div ref={this._content} className="react-component__ckeditor__content"></div>
                <textarea hidden readOnly name={this.props.name} value={this.state.value}></textarea>
            </div>
        );
    }
    renderEditor = () => {
        DecoupledEditor.create(this.state.value, {
            ...this.props.CKEditorConfig,
            placeholder: this.props.placeholder,
        })
        .then((editor: any) => {
            this._editor = editor;
            this._editor.config.entities = false;

            this._editor.model.document.on("change:data", () => {
                if (this._updateValueTimeout){ clearTimeout(this._updateValueTimeout) }
                this._updateValueTimeout = setTimeout(() => {
                    this.setState({ value: this._editor.getData() })
                }, 500)
                this.props.onChange(this._editor.getData());
            })

            this._toolbar.current.appendChild(this._editor.ui.view.toolbar.element);
            this._content.current.appendChild(this._editor.ui.view.editable.element);
        })
        .catch((error: any) => {
            console.error('There was a problem initializing the editor.', error);
        });
    }
}
 
export default CKEditor;