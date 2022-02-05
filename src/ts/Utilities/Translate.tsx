function translate(translations:any, translatable:string){
    return (translations && translations[translatable]) ? translations[translatable] : translatable;
}

export default translate;