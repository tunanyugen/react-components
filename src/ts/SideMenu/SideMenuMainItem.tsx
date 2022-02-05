import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../Model/ReactComponentElement';
import { Link } from 'react-router-dom';

export interface SideMenuMainItemProps extends ReactComponentElementProps{
    icon?:string;
    name?:string;
    to?:string;
}
 
export interface SideMenuMainItemState extends ReactComponentElementState{
    
}
 
class SideMenuMainItem extends ReactComponentElement<SideMenuMainItemProps, SideMenuMainItemState> {
    static defaultProps:SideMenuMainItemProps = {
        className: "",
        style: {},
        icon: "",
        name: "",
        to: "",
    }
    constructor(props: SideMenuMainItemProps) {
        super(props);
    }
    render() { 
        return (
            <Link
                className={`react-component__side-menu__main-item ${this.props.className}`}
                to={this.props.to}
            >
                <div className="react-component__side-menu__main-item__icon"><img src={this.props.icon} /></div>
                <div className="react-component__side-menu__main-item__name">{this.props.name}</div>
            </Link>
        );
    }
}
 
export default SideMenuMainItem;