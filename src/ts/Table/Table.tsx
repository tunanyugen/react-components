import * as React from 'react';
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../Model/ReactComponentElement';
import trueHeight from '../Utilities/TrueHeight';

export interface TableProps extends ReactComponentElementProps{
    
}
 
export interface TableState extends ReactComponentElementState{
    height:number|"auto";
}
 
class Table extends ReactComponentElement<TableProps, TableState> {
    static defaultProps:TableProps = {
        className: ""
    }
    private _table:React.RefObject<HTMLTableElement> = React.createRef();
    constructor(props: TableProps) {
        super(props);
        this.state = {
            height: "auto"
        }
    }
    componentDidMount(): void {
        this.calculateHeight();
    }
    componentDidUpdate(prevProps: Readonly<TableProps>, prevState: Readonly<TableState>, snapshot?: any): void {
        if (trueHeight(this._table.current) != this.state.height){
            this.calculateHeight();
        }
    }
    render() { 
        return (
            <div
                ref={this._table}
                className={`react-component__table ${this.props.className}`}
                style={{
                    ...this.props.style,
                    height: this.state.height
                }}
            >
                <table>
                    {this.props.children}
                </table>
            </div>
        );
    }
    calculateHeight = () => {
        this.setState({height: trueHeight(this._table.current)});
    }
}
 
export default Table;