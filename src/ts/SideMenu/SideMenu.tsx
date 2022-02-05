import Input from "../Form/Input/Input";
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from "../Model/ReactComponentElement";
import SideMenuItem, { SideMenuItemProps, SideMenuItemStyle } from "./SideMenuItem";
import SideMenuMainItem, { SideMenuMainItemProps } from "./SideMenuMainItem";

export interface SideMenuProps extends ReactComponentElementProps {
  width?: number;
  itemStyle?:SideMenuItemStyle;
  logo?: string;
  onSelect?: (item:SideMenuItemProps)=>any;
  className?: string;
  autoCollapse?: boolean;
  autoCollapseTime?: number;
  sideMenuMainItemProps?:SideMenuMainItemProps[];
  sideMenuItemProps?:SideMenuItemProps[];
}

export interface SideMenuState extends ReactComponentElementState{
  searchQuery: string;
}

class SideMenu extends ReactComponentElement<SideMenuProps, SideMenuState> {
  static defaultProps: SideMenuProps = {
    autoCollapse: false,
    autoCollapseTime: 0,
    className: "",
    style: {},
    logo: "",
    onSelect: () => {},
    width: 240,
    itemStyle:{
      height: 38,
      marginTop: 4,
      marginBottom: 4,
    },
    sideMenuItemProps: [],
    sideMenuMainItemProps: [],
  };
  private _updateSearchQueryTimeout: NodeJS.Timeout;
  constructor(props: SideMenuProps) {
    super(props);
    this.state = {
      searchQuery: "",
    };
    this.renderItems();
  }
  componentWillUnmount(): void {
      if (this._updateSearchQueryTimeout){ clearTimeout(this._updateSearchQueryTimeout) }
  }
  render() {
    return (
      <div
        className={`react-component__side-menu ${this.props.className}`}
        style={{
          ...this.props.style,
          width: this.props.width
        }}
      >
        <div className="react-component__side-menu__logo">
          <img src={this.props.logo}/>
        </div>
        <div className="react-component__side-menu__wrapper">
          <div className="react-component__side-menu__search">
            <Input
              placeholder="Search..."
              onChange={(e) => {
                this.updateSearchQuery(e.target.value);
              }}
            />
          </div>
          <div className="react-component__side-menu__main-items">
            {this.renderMainItems()}
          </div>
          <div className="react-component__side-menu__items">
            {this.renderItems()}
          </div>
        </div>
      </div>
    );
  }
  renderMainItems = () => {
    return this.props.sideMenuMainItemProps.map((props, index) => {
      return (
        <SideMenuMainItem key={`side-menu-main-item-${index}`} {...props} />
      )
    })
  }
  renderItems = () => {
    let children = [];
    // filter
    this.props.sideMenuItemProps.forEach((props, index) => {
      let regex = new RegExp(this.state.searchQuery, "gmi");
      if (JSON.stringify(props).match(regex)){
        children.push(
          <SideMenuItem
            {...props}
            sideMenuItemStyle={this.props.itemStyle}
            key={`side-menu-item-${index}`}
            onSelect={this.props.onSelect}
          />
        )
      }
    })
    return children;
  };
  updateSearchQuery = (value: string) => {
    if (this._updateSearchQueryTimeout) {
      clearTimeout(this._updateSearchQueryTimeout);
    }
    this._updateSearchQueryTimeout = setTimeout(() => {
      this.setState({ searchQuery: value });
    }, 300);
  };
}

export default SideMenu;