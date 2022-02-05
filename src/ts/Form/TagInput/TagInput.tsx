import * as React from 'react';
import NameValidator from '../../Utilities/NameValidator';
import translate from '../../Utilities/Translate';
import Button from '../Button/Button';
import Error from '../Error/Error';
import FormInput, { FormInputProps, FormInputState, FormInputValue } from '../FormInput';
import Select, { SelectProps } from '../Select/Select';
import Tag, { TagProps } from '../Tag/Tag';

export interface TagInputProps extends FormInputProps {
    placeholder?:string;
    selectProps:SelectProps;
    tagProps:TagProps[];
    onChange?:(tagProps:TagProps[])=>any
}
 
export interface TagInputState extends FormInputState{
    tagProps:TagProps[];
}
 
class TagInput extends FormInput<TagInputProps, TagInputState> {
    static defaultProps:TagInputProps = {
        placeholder:"",
        label: "",
        name: "",
        error: "",
        className: "",
        shouldRefresh: false,
        tagProps: [],
        selectProps: Select.defaultProps,
        onChange:()=>{}
    }
    private get _className(){
        return this.props.error.length > 0 ? "error" : "";
    }
    private get _selectProps():SelectProps{
        return {
            ...this.props.selectProps,
            dataListProps: {
                ...this.props.selectProps.dataListProps,
            }
        }
    }
    constructor(props: TagInputProps) {
        super(props);
        if (!NameValidator.isArray(this.props.name)){ throw `The name property must be an array (ends with "[]") \n Example: ${this.props.name}[]` }
        this.state = {
            tagProps: this.props.tagProps,
        }
    }
    componentDidUpdate(prevProps: Readonly<TagInputProps>, prevState: Readonly<TagInputState>, snapshot?: any): void {
        if (prevProps.tagProps != this.props.tagProps){
            this.setState({tagProps: this.props.tagProps});
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.clear()
        }
    }
    render() {
        return (
            <div
                className={`react-component__form__input react-component__tag-input ${this._className} ${this.props.className}`}
            >
                {this.renderLabel()}
                <div className="react-component__tag-input__wrapper">
                    <div
                        className="react-component__tag-input__tags"
                    >
                        {this.renderNullInput()}
                        {this.renderTags()}
                        <Error value={this.props.error} />
                    </div>
                    <div className="react-component__tag-input__buttons">
                        <Select
                            {...this._selectProps}
                            className="react-component__tag-input__filter"
                            placeholder={translate(this.props.translations, "filter")}
                            setValueOnSelect={false}
                            onSelect={this.onSelect}
                        />
                        <Button
                            className="react-component__tag-input__clear"
                            onClick={this.clear}
                        >{translate(this.props.translations, "clear")}</Button>
                    </div>
                </div>
            </div>
        );
    }
    renderNullInput = () => {
        if (this.state.tagProps.length < 1){
            return (<input hidden readOnly type="text" name={this.props.name}/>)
        }
        return "";
    }
    renderTags = () => {
        return this.state.tagProps.map((tagProps, index) => {
            return (
                <Tag
                    key={`tag-${tagProps.value}-${index}`}
                    {...tagProps}
                    name={this.props.name}
                    onDelete={(item) => { this.removeTag(index) }}
                />
            )
        })
    }
    removeTag = (index:number) => {
        let tagProps = [...this.state.tagProps];
        tagProps.splice(index, 1);
        this.setState({tagProps}, () => {
            this.props.onChange(this.state.tagProps)
        })
    }
    onSelect = (e:React.MouseEvent<HTMLButtonElement>, item:FormInputValue) => {
        let tagProps = [...this.state.tagProps];
        tagProps.push({
            name: this.props.name,
            value: item,
        })
        this.setState({
            tagProps: tagProps,
        }, () => {
            this.props.onChange(this.state.tagProps)
        })
    }
    clear = () => {
        this.setState({tagProps: []}, () => {
            this.props.onChange(this.state.tagProps)
        })
    }
}
 
export default TagInput;