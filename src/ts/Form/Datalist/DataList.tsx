import * as React from 'react';
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../../Model/ReactComponentElement';;
import trueHeight from '../../Utilities/TrueHeight';
import DataListItem, { DataListItemProps } from './DataListItem';

export interface DataListProps extends ReactComponentElementProps {
    collapsed?:boolean;
    toggler?:HTMLInputElement;
    items?:DataListItemProps[];
    onSelect?:(e:React.MouseEvent<HTMLButtonElement>, item:DataListItemProps) => any
    onPointerLeave?:React.PointerEventHandler<HTMLDivElement>;
}
 
export interface DataListState extends ReactComponentElementState{
    display:string;
    overflowY:"visible" | "hidden" | "clip" | "scroll" | "auto";
    height:number;
    userInteracted:boolean;
}
 
class DataList extends ReactComponentElement<DataListProps, DataListState> {
    static defaultProps: DataListProps= {
        collapsed: true,
        toggler: null,
        items: [],
        className: "",
        style: {},
        onSelect:()=>{},
        onPointerLeave:()=>{},
    }
    element:React.RefObject<HTMLDivElement> = React.createRef();
    private _timeout:NodeJS.Timeout;
    constructor(props: DataListProps) {
        super(props);
        this.state = {
            display: "none",
            overflowY: "hidden",
            height: 0,
            userInteracted: false,
        }
    }
    componentDidUpdate(prevProps: Readonly<DataListProps>, prevState: Readonly<DataListState>, snapshot?: any): void {
        if (prevProps.collapsed != this.props.collapsed){
            this.props.collapsed ? this.collapse() : this.calculateHeight();
        }
        if (prevProps.collapsed == this.props.collapsed && prevProps.items.length != this.props.items.length){
            this.calculateHeight();
        }
    }
    render() {
        return (
            <div
                className={`react-component__data-list ${this.props.className} ${this.props.collapsed ? "collapsed" : ""}`}
                style={this.props.style}
                onPointerEnter={() => { this.setState({userInteracted: true}) }}
                onPointerLeave={this.props.onPointerLeave}
            >
                <div
                    ref={this.element}
                    className="react-component__data-list__wrapper"
                    style={{
                        display: this.state.display,
                        overflowY: this.state.overflowY,
                        height: this.state.height,
                    }}
                >
                    {this.renderItems()}
                </div>
            </div>
        );
    }
    renderItems = () => {
        return Array.from(this.props.items).map((dataListItemProps, index) => {
            return (
                <DataListItem
                    {...dataListItemProps}
                    key={`data-list-item-${dataListItemProps.id}-${index}`}
                    onSelect={this.props.onSelect}
                />
            )
        })
    }
    calculateHeight = () => {
        this.setState({display: "block"}, () => {
            this.setState({overflowY: "hidden", height: trueHeight(this.element.current)}, () => {
                setTimeout(() => {
                    this.setState({overflowY: null});
                }, 250);
            });
        })
    }
    collapse = () => {
        this.setState({overflowY: "hidden", height: 0}, () => {
            setTimeout(() => {
                this.setState({display: "none", overflowY: null})
            }, 250);
        })
    }
}
 
export default DataList;