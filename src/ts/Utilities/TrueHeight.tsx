function trueHeight(element:HTMLElement){
    let clone = element.cloneNode(true) as HTMLDivElement;
    clone.style.height = "auto";
    clone.style.position = "absolute";
    clone.style.transition = "0s";
    clone.style.display = "block";
    clone.style.opacity = "0";
    clone.style.pointerEvents = "none";
    document.body.append(clone);
    let trueHeight = Math.ceil(clone.offsetHeight + 1);
    clone.remove();
    return trueHeight;
}

export default trueHeight;