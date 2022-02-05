import * as React from "react";
import ReactComponentElement, {
  ReactComponentElementProps,
  ReactComponentElementState,
} from "../Model/ReactComponentElement";
import ContextMenu, { ContextMenuProps } from "./ContextMenu";

export interface ContextMenuItemProps extends ReactComponentElementProps {
  icon?: string;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  contextMenuProps?: ContextMenuProps;
}

export interface ContextMenuItemState extends ReactComponentElementState {
  hideContextMenu: boolean;
}

class ContextMenuItem extends ReactComponentElement<ContextMenuItemProps, ContextMenuItemState> {
  static defaultProps: ContextMenuItemProps = {
    className: "",
    style: {},
    icon: "",
    name: "",
    onClick: () => {},
    contextMenuProps: null,
  };
  constructor(props: ContextMenuItemProps) {
    super(props);
    this.state = {
      hideContextMenu: true,
    };
  }
  render() {
    return (
      <div
        className={`react-component__context-menu__item ${this.props.className}`}
        style={this.props.style}
        onClick={this.props.onClick}
        onPointerEnter={(e) => {
          this.setState({ hideContextMenu: false });
        }}
        onPointerLeave={(e) => {
          this.setState({ hideContextMenu: true });
        }}
      >
        <img className="react-component__context-menu__item__icon" src={this.props.icon} />
        <div className="react-component__context-menu__item__name">{this.props.name}</div>
        {this.renderContextMenu()}
      </div>
    );
  }
  renderContextMenu = () => {
    if (!this.props.contextMenuProps) {
      return "";
    }
    return (
      <ContextMenu
        {...this.props.contextMenuProps}
        className="react-component__context-menu__item__context-menu"
        hidden={this.state.hideContextMenu}
      />
    );
  };
}

export default ContextMenuItem;
