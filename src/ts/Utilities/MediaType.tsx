interface MediaType {
    type: "img"|"iframe"|"";
    src: string;
}
export default function mediaType(src:string): MediaType {
    if (!src){
        return {
            type: "",
            src: src,
        }
    }
    let match = null;
    if (match = src.match(/\.(jpeg|jpg|png|tiff|svg)$/mui)){
        return {
            type: "img",
            src: src
        };
    } else if (match = src.match(/^<iframe.*(\/>|<\/iframe>)$/mui)){
        if (match){
            match = src.match(/(?<=src=['|"])(.+?)(?=['|"])/mui);
            if (match){
                return {
                    type: "iframe",
                    src: match[0]
                }
            }
        }
    }
    return {
        type: "",
        src: src,
    }
}