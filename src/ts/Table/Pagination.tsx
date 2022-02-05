import React from "react";
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from "../Model/ReactComponentElement";

export interface PaginationProps extends ReactComponentElementProps{
    pageCount?:number,
    currentPage?:number,
    onClick?:(page:number) => any,
}
 
export interface PaginationState extends ReactComponentElementState{
    
}
 
class Pagination extends ReactComponentElement<PaginationProps, PaginationState> {
    static defaultProps:PaginationProps = {
        className: "",
        style: {},
        currentPage: 1,
        onClick: () => {},
        pageCount: 0,
    }
    render(){
        return(
            <div
                className={`react-component__pagination ${this.props.className}`}
                style={this.props.style}
            >
                <div className="react-component__pagination__wrapper">
                    {this.renderButtons()}
                </div>
            </div>
        )
    }
    renderButtons = () => {
        let padding = 2;

        const buttons = [];
        if (this.props.pageCount <= 1){ return buttons; }
        let start = this.props.currentPage - padding;
        if (start < 1){ start = 1 }
        let end = this.props.currentPage + padding;
        if (end > this.props.pageCount){ end = this.props.pageCount }
        // first page
        if (start > 1){
            buttons.push(
                <React.Fragment>
                    <button key={"button-"+1} className={`react-component__pagination__item`} onClick={() => { this.props.onClick(1) }}>{1}</button>
                    <div className="react-component__pagination__filler">...</div>
                </React.Fragment>
            )
        }
        // current and surrounding pages
        for (let i = start; i <= end; i++){
            buttons.push(
                <button key={"button-"+i} className={`react-component__pagination__item ${this.props.currentPage == i ? "active" : ""}`} onClick={() => { this.props.onClick(i) }}>{i}</button>
            )
        }
        // last page
        if (end < this.props.pageCount){
            buttons.push(
                <React.Fragment>
                    <div className="react-component__pagination__filler">...</div>
                    <button key={"button-"+this.props.pageCount} className={`react-component__pagination__item`} onClick={() => { this.props.onClick(this.props.pageCount) }}>{this.props.pageCount}</button>
                </React.Fragment>
            )
        }
        return buttons;
    }
}
 
export default Pagination;