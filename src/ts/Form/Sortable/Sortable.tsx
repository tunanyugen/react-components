import React from 'react';
import NameValidator from '../../Utilities/NameValidator';
import translate from '../../Utilities/Translate';
import Button from '../Button/Button';
import FormInput, { FormInputProps, FormInputState, FormInputValue } from '../FormInput';
import Select, { SelectProps } from '../Select/Select';
import Tag, { TagProps } from '../Tag/Tag';

export interface SortableProps extends FormInputProps {
    tagProps?:ExtendedTagProps[];
    selectProps?:SelectProps;
    onChange?:(tagProps:ExtendedTagProps[])=>any;
}
 
export interface SortableState extends FormInputState {
    tagProps:ExtendedTagProps[];
    dataListCollapsed:boolean;
}
interface Target{
    index:number,
    props: TagProps,
    element: HTMLElement,
}
interface ExtendedTagProps extends TagProps{
    index:number;
}
 
class Sortable extends FormInput<SortableProps, SortableState> {
    static defaultProps: SortableProps = {
        className: "",
        error: "",
        label: "",
        name: "",
        shouldRefresh: false,
        translations: {},
        tagProps: [],
        selectProps: Select.defaultProps,
        onChange:()=>{}
    };
    private get _selectProps():SelectProps{
        return {
            ...this.props.selectProps,
            dataListProps: {
                ...this.props.selectProps.dataListProps,
            }
        }
    }
    private _wrapper:React.RefObject<HTMLDivElement> = React.createRef();
    private _dragTarget:Target = {
        index: -1,
        props:null,
        element:null
    };

    constructor(props: SortableProps) {
        super(props);
        if (!NameValidator.isArray(this.props.name)){ throw `The name property must be an array (ends with "[]") \n Example: ${this.props.name}[]` }
        this.state = {
            tagProps: this.props.tagProps,
            dataListCollapsed: true,
        }
    }
    componentDidMount(): void {
        if (!this.sorted()){ this.sortItems() }
        this._wrapper.current.addEventListener("pointermove", (e) => {
            if (!this._dragTarget.element){ return }
            this._dragTarget.element.style.left = `${e.clientX}px`;
            this._dragTarget.element.style.top = `${e.clientY}px`;
        })
        this._wrapper.current.addEventListener("pointerleave", () => {
            this.dropTag();
        })
        this._wrapper.current.addEventListener("pointerup", () => {
            this.dropTag();
        })
    }
    componentDidUpdate(prevProps: Readonly<SortableProps>, prevState: Readonly<SortableState>, snapshot?: any): void {
        if (prevProps.tagProps != this.props.tagProps){
            if (!this.sorted()){ this.sortItems() }
            this.setState({tagProps: this.props.tagProps});
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.clear()
        }
    }
    render() { 
        return (
            <div className={`react-component__form__input react-component__sortable ${this.props.className}`}>
                {this.renderLabel()}
                <div
                    ref={this._wrapper}
                    className="react-component__sortable__wrapper">
                    {this.renderItems()}
                </div>
                <div className="react-component__sortable__buttons">
                    <Button
                        onClick={(e) => { this.clear() }}
                    >{translate(this.props.translations, "clear")}</Button>
                    <Select
                        {...this._selectProps}
                        className="react-component__sortable__filter"
                        placeholder={translate(this.props.translations, "filter")}
                        setValueOnSelect={false}
                        onSelect={(e, item) => {
                            this.addTag(item, () => {
                                this.setState({ dataListCollapsed: true })
                            })
                        }}
                    />
                </div>
            </div>
        );
    }
    renderItems = () => {
        let items = [];
        this.state.tagProps.forEach((props, index) => {
            items.push(
                <Tag
                    key={`tag-${props.index}-${index}`}
                    name={this.props.name}
                    className={`${index}`}
                    value={props.value}
                    onDelete={() => { this.deleteItem(index) }}
                    onPointerDown={() => {
                        this.dragTag(index);
                    }}
                    onPointerEnter={() => {
                        this.replaceWith(index)
                    }}
                />
            )
        })
        return items;
    }
    addTag = (tag:FormInputValue, callback:Function=()=>{}) => {
        this.setState({
            tagProps: [
                ...this.state.tagProps,
                {
                    index: this.state.tagProps.length > 0 ? this.state.tagProps.at(-1).index + 1 : 1,
                    value: {
                        id: tag.id,
                        value: tag.value
                    }
                }
            ]
        }, () => {
            callback();
            this.props.onChange(this.state.tagProps)
        })
    }
    replaceWith = (index:number) => {
        if (!this._dragTarget.element){ return }
        let clonedProps = [...this.state.tagProps];
        let targetIndex = clonedProps[index].index;
        if (this._dragTarget.index <= index){
            for (let i = index; i > this._dragTarget.index; i--){
                clonedProps[i].index--;
            }
        } else {
            for (let i = index; i < this._dragTarget.index; i++){
                clonedProps[i].index++;
            }
        }
        clonedProps[this._dragTarget.index].index = targetIndex;
        this._dragTarget.index = index;
        this.setState({tagProps: clonedProps}, () => {
            this.sortItems(() => {
                this.props.onChange(this.state.tagProps)
            })
        })
    }
    dragTag = (index:number) => {
        this._dragTarget.index = index;
        this._dragTarget.props = this.state.tagProps[index];
        this._dragTarget.element = this._wrapper.current.querySelectorAll(".react-component__tag")[index].cloneNode(true) as HTMLDivElement;
        this._dragTarget.element.style.position = "absolute";
        this._dragTarget.element.style.pointerEvents = "none";
        document.body.append(this._dragTarget.element);
    }
    dropTag = () => {
        if (!this._dragTarget.element){ return }
        this._dragTarget.element.remove();
        this._dragTarget.index = -1;
        this._dragTarget.props = null;
        this._dragTarget.element = null;
    }
    sorted = () => {
        if (this.state.tagProps.length < 2){ return true }
        for (let i = 1; i < this.state.tagProps.length; i++){
            if (this.state.tagProps[i].index < this.state.tagProps[i - 1].index){ return false }
        }
        return true;
    }
    sortItems = (callback:()=>any=()=>{}) => {
        let clones = [...this.state.tagProps];
        clones.sort((props1, props2) => {
            return props1.index - props2.index;
        })
        this.setState({tagProps: clones}, callback);
    }
    deleteItem = (index:number) => {
        let newTagProps = [...this.state.tagProps];
        newTagProps.splice(index, 1);
        this.setState({tagProps: newTagProps}, () => {
            this.props.onChange(this.state.tagProps);
        });
    }
    clear = () => {
        this.setState({tagProps: []}, () => {
            this.props.onChange(this.state.tagProps);
        });
    }
}
 
export default Sortable;