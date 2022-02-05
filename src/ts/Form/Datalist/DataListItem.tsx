import * as React from 'react';
import Button, {ButtonProps} from "../Button/Button";

export interface DataListItemProps {
    id:string;
    value:string;
    buttonProps?:ButtonProps;
    onSelect?:(e:React.MouseEvent<HTMLButtonElement>, payload:DataListItemProps) => any
}
 
export interface DataListItemState {
    
}
 
class DataListItem extends React.Component<DataListItemProps, DataListItemState> {
    static defaultProps:DataListItemProps = {
        id: "",
        value: "",
        buttonProps: Button.defaultProps,
        onSelect: () => {}
    }
    constructor(props: DataListItemProps) {
        super(props);
    }
    render() { 
        return (
            <Button
                {...this.props.buttonProps}
                tabIndex={-1}
                type="button"
                className="react-component__data-list__item"
                onMouseDown={(e) => { this.props.onSelect(e as React.MouseEvent<HTMLButtonElement>, this.props) }}
            >
                {this.props.value}
            </Button>
        );
    }
}
 
export default DataListItem;