import ReactComponentElement, {
  ReactComponentElementProps,
  ReactComponentElementState,
} from "../Model/ReactComponentElement";
import ContextMenuItem, { ContextMenuItemProps } from "./ContextMenuItem";

export interface ContextMenuProps extends ReactComponentElementProps {
  hidden?: boolean;
  itemsProps?: ContextMenuItemProps[];
}

export interface ContextMenuState extends ReactComponentElementState {}

class ContextMenu extends ReactComponentElement<ContextMenuProps, ContextMenuState> {
  static defaultProps: ContextMenuProps = {
    className: "",
    style: {},
    hidden: false,
    itemsProps: [],
  };
  constructor(props: ContextMenuProps) {
    super(props);
  }
  render() {
    return (
      <div
        className={`react-component__context-menu ${this.props.hidden ? "hide" : ""} ${
          this.props.className
        }`}
        style={this.props.style}
      >
        <div className="react-component__context-menu__items">{this.renderItems()}</div>
      </div>
    );
  }
  renderItems = () => {
    return this.props.itemsProps.map((props, index) => {
      return <ContextMenuItem
                key={`context-menu-item-${props.name}-${index}`}
                {...props}
            />;
    });
  };
}

export default ContextMenu;
