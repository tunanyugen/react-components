import * as React from 'react';
import { CSSProperties } from "react";

export interface ReactComponentElementProps {
    className?:string;
    style?:CSSProperties;    
}
 
export interface ReactComponentElementState {
    
}
 
export class ReactComponentElement<P extends ReactComponentElementProps, S extends ReactComponentElementState> extends React.Component<P, S> {
    constructor(props: P) {
        super(props);
    }
    
}
 
export default ReactComponentElement;