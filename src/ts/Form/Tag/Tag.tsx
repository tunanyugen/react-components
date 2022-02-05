import FormInput, { FormInputProps, FormInputState, FormInputValue } from '../FormInput';

export interface TagProps extends FormInputProps{
    value?:FormInputValue;
    onDelete?:(value:FormInputValue)=>any;
    onPointerEnter?:()=>any;
    onPointerLeave?:()=>any;
    onPointerDown?:()=>any;
    onPointerUp?:()=>any;
}
 
export interface TagState extends FormInputState{
    
}
 
class Tag extends FormInput<TagProps, TagState> {
    static defaultProps:TagProps = {
        name: "",
        error: "",
        value: {id:"",value:""},
        className: "",
        style: {},
        shouldRefresh: false,
        label: "",
        onDelete:()=>{},
        onPointerEnter:()=>{},
        onPointerLeave:()=>{},
        onPointerDown:()=>{},
        onPointerUp:()=>{},
    }
    constructor(props: TagProps) {
        super(props);
    }
    render() { 
        return (
            <div
                className={`react-component__tag ${this.props.className}`}
                draggable={false}
                style={this.props.style}
                onPointerEnter={(e) => { this.props.onPointerEnter() }}
                onPointerLeave={(e) => { this.props.onPointerLeave() }}
                onPointerDown={(e) => { this.props.onPointerDown() }}
                onPointerUp={(e) => { this.props.onPointerUp() }}
            >
                <p className="react-component__tag__text">
                    {this.props.value.value}
                </p>
                <div
                    className="react-component__tag__delete"
                    onClick={() => { this.props.onDelete(this.props.value) }}
                >X</div>
                <input hidden readOnly name={this.props.name} value={this.props.value.id} type="text" />
            </div>
        );
    }
}
 
export default Tag;