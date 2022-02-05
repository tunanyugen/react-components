import * as React from 'react';
import trueHeight from '../../Utilities/TrueHeight';
import CheckBox from '../Checkbox/Checkbox';

export interface OptionalProps{
    label:string;
    defaultValue:boolean;
}
 
export interface OptionalState {
    collapsed:boolean;
}
 
class Optional extends React.Component<OptionalProps, OptionalState> {
    private _container:React.RefObject<HTMLDivElement> = React.createRef();
    static defaultProps:OptionalProps = {
        label: "",
        defaultValue: false,
    }
    constructor(props: OptionalProps) {
        super(props);
        this.state = {
            collapsed: !this.props.defaultValue
        }
    }
    componentDidMount(): void {
        if (this.props.defaultValue){ this.forceUpdate() }
    }
    render() {
        return (
            <div className="react-component__form__input react-component__optional">
                <CheckBox label={this.props.label} value={this.props.defaultValue} onChange={(value) => { this.toggleCollapsed(!value) }} />
                <div
                    ref={this._container}
                    style={{height: (!this.state.collapsed && this._container.current) ? trueHeight(this._container.current) : 0}}
                    className="react-component__form__input react-component__optional__container"
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
    toggleCollapsed = (value:boolean) => {
        this.setState({collapsed: value})
    }
}
 
export default Optional;