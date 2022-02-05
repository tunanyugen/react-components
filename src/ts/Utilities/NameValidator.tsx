export default class NameValidator{
    static isArray(name:string){
        return name.match(/\[\]$/gmi);
    }
}