import * as React from 'react';
import * as CSS from "csstype";
import ReactComponentElement, { ReactComponentElementProps, ReactComponentElementState } from '../Model/ReactComponentElement';
import ScrollBooster from 'scrollbooster';

export interface LightboxMedia{
    type:"img"|"iframe"|"",
    src:string,
    onClick?:React.MouseEventHandler<HTMLImageElement>,
}
export interface LightBoxProps extends ReactComponentElementProps{
    hidden?:boolean;
    medias?:LightboxMedia[];
    onClose?:()=>any;
}
 
export interface LightBoxState extends ReactComponentElementState{
    index:number;
    validMedias:LightboxMedia[];
    opacity: 0|1;
}
 
class Lightbox extends ReactComponentElement<LightBoxProps, LightBoxState> {
    static defaultProps:LightBoxProps = {
        hidden: true,
        medias: [],
        className: "",
        onClose: () => {}
    }
    private _element:React.RefObject<HTMLDivElement> = React.createRef();
    private _medias:React.RefObject<HTMLDivElement> = React.createRef();
    private _previews:React.RefObject<HTMLDivElement> = React.createRef();
    private _scroll:ScrollBooster;
    private _lastPointerDownPos:{x:number, y:number};
    constructor(props: LightBoxProps) {
        super(props);
        this.state = {
            index: 0,
            opacity: this.props.hidden ? 0 : null,
            validMedias: [],
        }
    }
    componentDidMount(){
        this.setIndex(0);
    }
    componentDidUpdate(prevProps: Readonly<LightBoxProps>, prevState: Readonly<LightBoxState>, snapshot?: any): void {
        if (prevProps.medias != this.props.medias){
            this.setState({validMedias: this.getValidMedias()})
        }
        // create scroll if not existing and update if otherwise
        if (!this._scroll){ this.initPreviewsScroll() }
        else { this._scroll.updateMetrics() }
    }
    private get _toggleClassName(){ return this.props.hidden ? "hide" : "shows" }
    render() {
        return (
            <div
                className={`react-component__lightbox ${this._toggleClassName} ${this.props.className}`}
                ref={this._element}
                style={this.props.style}
            >
                <div
                    ref={this._medias}
                    className="react-component__lightbox__medias"
                    onClick={(e) => { if (e.target == this._medias.current){ this.props.onClose() } }}
                >
                    {this.renderMedias()}
                </div>
                <div
                    ref={this._previews}
                    className="react-component__lightbox__previews"
                >
                    <div>
                        {this.renderPreviews()}
                    </div>
                </div>
                {this.renderNext()}
                {this.renderPrev()}
                {this.renderIndex()}
                {this.renderClose()}
            </div>
        );
    }
    getValidMedias = () => {
        let medias = [];
        for(let media of this.props.medias){
            if (media.type.length > 0){
                medias.push(media);
            }
        }
        return medias;
    }
    setIndex = (index:number) => {
        this.setState({index: index})
    }
    renderNext = () => {
        if (this.state.index >= this.state.validMedias.length - 1){ return "" }
        return (
            <button
                type="button"
                className="react-component__lightbox__next"
                onClick={() => { this.setIndex((this.state.validMedias.length + this.state.index + 1) % this.state.validMedias.length) }}
            >
                {">"}
            </button>
        )
    }
    renderPrev = () => {
        if (this.state.index <= 0){ return "" }
        return (
            <button
                type="button"
                className="react-component__lightbox__back"
                onClick={() => { this.setIndex((this.state.validMedias.length + this.state.index - 1) % this.state.validMedias.length) }}
            >
                {"<"}
            </button>
        )
    }
    renderMedias = () => {
        let medias = [];
        for (let i = 0; i < this.state.validMedias.length; i++){
            let className = "";
            if (this.state.index == i){ className = "react-component__lightbox__media show" }
            else { className = "react-component__lightbox__media hide" }
            if (this.state.validMedias[i].type == "img"){
                medias.push(
                    <img
                        className={`${className} img`}
                        key={`media-${i}`}
                        src={this.state.validMedias[i].src}
                        onClick={this.state.validMedias[i].onClick}
                    />
                )
            } else if (this.state.validMedias[i].type == "iframe"){
                medias.push(
                    <iframe
                        allowFullScreen={true}
                        className={`${className} iframe`}
                        key={`media-${i}`}
                        src={this.state.validMedias[i].src}
                    />
                )
            }
        }
        return medias;
    }
    renderPreviews = () => {
        let previews = [];
        for (let i = 0; i < this.state.validMedias.length; i++){
            let preview = this.state.validMedias[i];
            let className = "react-component__lightbox__preview";
            if (this.state.index == i){ className += " active"}
            if (preview.type == "img"){
                previews.push(
                    <img
                        className={`${className}`}
                        key={`media-${i}`}
                        src={preview.src}
                        onClick={(e) => {
                            this.setIndex(i);
                            preview.onClick ? preview.onClick(e) : null;
                        }}
                    />
                )
            } else if (preview.type == "iframe"){
                let src = preview.src;
                // get youtube thumbnail if is youtube iframe
                let youtubeMatch = preview.src.match(/^https:\/\/www.youtube.com\/embed\/(.*?)(\?|$)/mui);
                if (youtubeMatch){ src = `https://img.youtube.com/vi/${youtubeMatch[1]}/0.jpg` }
                previews.push(
                    <img
                        className={`${className}`}
                        key={`media-${i}`}
                        src={src}
                        onClick={(e) => {
                            this.setIndex(i);
                        }}
                    />
                )
            }
        }
        return previews;
    }
    initPreviewsScroll = () => {
        if (this.props.hidden){ return }
        this._scroll = new ScrollBooster({
            viewport: this._previews.current,
            content: this._previews.current.firstElementChild as HTMLElement,
            scrollMode: 'native',
            direction: 'horizontal',
        })
        this._previews.current.addEventListener("pointerdown", (e) => {
            this._lastPointerDownPos = {x: e.clientX, y: e.clientY};
        })
        this._previews.current.addEventListener("pointerup", (e) => {
            if (e.clientX == this._lastPointerDownPos.x){
                this._scroll.setPosition({x: this._previews.current.scrollLeft, y: 0})
            }
        })
    }
    renderIndex = () => {
        return (
            <div
                className="react-component__lightbox__index"
            >
                {`${this.state.index + 1} / ${this.state.validMedias.length}`}
            </div>
        )
    }
    renderClose = () => {
        return (
            <button
                type="button"
                className="react-component__lightbox__close"
                onClick={(e) => { this.props.onClose() }}
            >
                X
            </button>
        )
    }
}
 
export default Lightbox; 