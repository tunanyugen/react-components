import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../Model/ReactComponentElement';
import trueHeight from '../Utilities/TrueHeight';
export interface SideMenuItemStyle {
    height?: number;
    marginTop?: number;
    marginBottom?:number;
}
export interface SideMenuItemProps extends ReactComponentElementProps{
    icon?:string;
    name?:string;
    to?:string;
    sideMenuItemProps?:SideMenuItemProps[];
    onSelect?:(item:SideMenuItemProps)=>any;
    sideMenuItemStyle?:SideMenuItemStyle;
}
 
export interface SideMenuItemState extends ReactComponentElementState{
    hidden:boolean;
    childrenHeight:number|"auto";
    childrenDisplay:string;
}
 
class SideMenuItem extends ReactComponentElement<SideMenuItemProps, SideMenuItemState> {
    static defaultProps:SideMenuItemProps = {
        icon: "",
        name: "",
        className: "",
        to: "#",
        sideMenuItemProps: [],
        onSelect:()=>{},
        sideMenuItemStyle: {
            height: 38,
            marginTop: 4,
            marginBottom: 4,
        },
    }
    private _children:React.RefObject<HTMLDivElement> = React.createRef();
    private get _statusClassName(){
        if (this.props.sideMenuItemProps.length <= 0){ return "" }
        return this.state.hidden ? "collapsed" : "expanded";
    };
    private get _activeClassName(){
        let shouldActive = false;
        let escapedRoute = this.props.to.replace(/\//gi, "\\/");
        let regexp = new RegExp(`^(http|https):\/\/.*?(${escapedRoute})(\/.*)?$`, "gmi");
        const result = regexp.exec(window.location.href);
        shouldActive = result && result[2] == this.props.to ? true : false;
        return shouldActive ? "active" : "";
    }
    constructor(props: SideMenuItemProps) {
        super(props);
        this.state = {
            hidden: true,
            childrenHeight: "auto",
            childrenDisplay: "block",
        }
    }
    componentDidMount(){
        this.calculateHeight();
    }
    render() { 
        let shouldActive = false;
        if (this.props.to){
            let escapedRoute = this.props.to.replace(/\//gi, "\\/");
            let regexp = new RegExp(`^(http|https):\/\/.*?(${escapedRoute})(\/.*)?$`, "gmi");
            const result = regexp.exec(window.location.href);
            shouldActive = result && result[2] == this.props.to ? true : false;
        }
        return (
            <div
                className={`react-component__side-menu__item ${this._statusClassName} ${this._activeClassName} ${this.props.className}`}
                style={this.props.style}
                onClick={() => { this.forceUpdate() }}
            >
                <Link
                    className="react-component__side-menu__item__label"
                    to={this.props.to}
                    onClick={() => {
                        if (this.props.sideMenuItemProps.length > 0){
                            this.toggle()
                        }
                        this.props.onSelect(this.props)
                    }}
                    style={{
                        height: this.props.sideMenuItemStyle.height,
                        marginTop: this.props.sideMenuItemStyle.marginTop,
                        marginBottom: this.props.sideMenuItemStyle.marginBottom,
                    }}
                >
                    <img className="react-component__side-menu__item__icon" src={this.props.icon} />
                    <div
                        className="react-component__side-menu__item__name"
                    >{this.props.name}</div>
                    {this.renderArrow()}
                </Link>
                {this.renderChildren()}
            </div>
        );
    }
    renderChildren = () => {
        if (this.props.sideMenuItemProps.length < 1){ return "" }
        return (
            <div
                ref={this._children}
                className={`react-component__side-menu__item__children`}
                style={{
                    display: this.state.childrenDisplay,
                    height: this.state.childrenHeight,
                }}
            >
                {
                    this.props.sideMenuItemProps.map((props, index) => {
                        return (
                        <SideMenuItem
                            {...props}
                            sideMenuItemStyle={this.props.sideMenuItemStyle}
                            key={`side-menu__item-${index}`}
                            onSelect={this.props.onSelect}
                        />);
                    })
                }
            </div>
        )
      };
    renderArrow = () => {
        if (this.props.sideMenuItemProps.length > 0){
            return (
                <button
                    className="react-component__side-menu__item__arrow"
                    onClick={() => { this.toggle() }}
                >
                    <i className="fas fa-caret-down"></i>
                </button>
            )
        }
        return "";
    }
    toggle = () => {
        if (this.state.hidden){
            this.calculateHeight();
        } else {
            this.collapse();
        }
    }
    collapse = () => {
        if (!this._children.current){ return }
        this.setState({hidden: true, childrenHeight: 0}, () => {
            setTimeout(() => {
                this.setState({childrenDisplay: "none"});
            }, 250);
        });
    }
    calculateHeight = () => {
        if (!this._children.current){ return }
        this.setState({childrenDisplay: "block"}, () => {
            let height = trueHeight(this._children.current);
            this.setState({hidden: false, childrenHeight: height}); 
        });
    }
}
 
export default SideMenuItem;