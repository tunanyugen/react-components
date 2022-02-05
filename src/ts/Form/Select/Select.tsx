import * as React from 'react';
import DataList, { DataListProps } from '../Datalist/DataList';
import Input, { InputProps } from '../Input/Input';
import FormInput, { FormInputProps, FormInputState, FormInputValue } from '../FormInput';
import { DataListItemProps } from '../Datalist/DataListItem';


export interface SelectProps extends FormInputProps{
    placeholder?:string;
    inputProps?: InputProps,
    dataListProps?: DataListProps,
    shouldFilter?: boolean,
    setValueOnSelect?:boolean,
    onSelect?:(e:React.MouseEvent<HTMLButtonElement>, item:FormInputValue)=>any
}
 
export interface SelectState extends FormInputState{
    inputProps: InputProps,
    dataListProps: DataListProps,
}
 
class Select extends FormInput<SelectProps, SelectState> {
    static defaultProps: SelectProps = {
        error: "",
        label: "",
        name: "",
        placeholder: "",
        shouldRefresh: false,
        setValueOnSelect: true,
        inputProps: Input.defaultProps,
        dataListProps: DataList.defaultProps,
        shouldFilter: true,
        className: "",
        onSelect:()=>{}
    }
    constructor(props: SelectProps) {
        super(props);
        this.state = {
            inputProps: {...Input.defaultProps, value: this.props.inputProps.value},
            dataListProps: {...DataList.defaultProps}
        }
    }
    componentDidUpdate(prevProps: Readonly<SelectProps>, prevState: Readonly<SelectState>, snapshot?: any): void {
        if (prevProps.inputProps.value != this.props.inputProps.value){
            this.setState({inputProps: this.props.inputProps})
        }
        if (prevProps.dataListProps != this.props.dataListProps){
            this.setState({dataListProps: {...this.state.dataListProps, ...this.props.dataListProps}})
        }
        if (prevProps.shouldRefresh == false && this.props.shouldRefresh == true){
            this.forceUpdate(() => {
                this.setState({inputProps: { value: "" }});
            })
        }
    }
    render() {
        return (
            <div
                className={`react-component__form__input react-component__select ${this.props.className}`}
                onPointerDown={() => { this.expandDataList() }}
            >
                {this.renderLabel()}
                <input hidden readOnly name={this.props.name} value={this.getID(this.state.inputProps.value)}/>
                <Input
                    {...this.props.inputProps}
                    value={this.state.inputProps.value}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    shouldRefresh={this.props.shouldRefresh}
                    onChange={(e) => {
                        let input = {...this.state.inputProps};
                        input.value = e.target.value;
                        this.setState({inputProps: input});
                        this.props.inputProps.onChange ? this.props.inputProps.onChange(e) : null;
                    }}
                    onFocus={() => { this.expandDataList() }}
                    onBlur={() => { this.collapseDataList() }}
                />
                <DataList
                    {...this.props.dataListProps}
                    collapsed={this.state.dataListProps.collapsed}
                    items={this.renderItems()}
                    onSelect={(e, item) => {
                        let inputState = {...this.state.inputProps};
                        inputState.value = item.value;
                        if (this.props.setValueOnSelect){
                            this.setState({ inputProps: inputState }, () => {
                                this.props.onSelect(e, { id: item.id, value: item.value });
                            })
                        } else {
                            this.props.onSelect(e, { id: item.id, value: item.value });
                        }
                        this.collapseDataList();
                    }}
                />
            </div>
        )
    }
    renderItems = () => {
        if (!this.props.shouldFilter){
            return this.props.dataListProps.items;
        }
        let items:DataListItemProps[] = [];
        this.props.dataListProps.items.forEach((item) => {
            let regex = new RegExp(this.state.inputProps.value, "mui");
            if ((`${item.id}`).match(regex) || (`${item.value}`).match(regex)){
                items.push(item);
            }
        })
        return items;
    }
    expandDataList = () => {
        this.setState({
            dataListProps: {
                ...this.state.dataListProps,
                collapsed: false
            }
        })
    }
    collapseDataList = () => {
        this.setState({dataListProps: {
            ...this.state.dataListProps,
            collapsed: true
        }})
    }
    getID = (value:string) => {
        let items = Array.from(this.props.dataListProps.items);
        for (let item of items){
            if (value == item.value){
                return item.id as string;
            }
        }
        return "";
    }
}
 
export default Select;