interface ID_TYPES{
     BASE_ID : number, 
     PARENT_ID : number,
     STACK_ID:number,
     SECTION_ID: number, 
}
interface ELEMENT_RESIZE{
     TOP:boolean,
     LEFT:boolean,
     RIGHT:boolean,
     BOTTOM:boolean,
}

interface ELEMENT_BOOL_TYPES{
     MOVEABLE : boolean,
     DELETED :boolean,
     EDITABLE : boolean,
     ENABLED : boolean,
     RESIZEABLE : boolean,
     RESIZE_MODES:ELEMENT_RESIZE,
     IS_LINK : boolean,    
     SELECTABLE:boolean,
     PARENTABLE:boolean,
     PROBAL_ATTACH:boolean,
}
interface ELEMENT_MENU_TYPES{
     position:boolean,
     padding:boolean,     
     margin:boolean,
     background:boolean,
     border:boolean,
     dimension:boolean,
}
export type {ID_TYPES,ELEMENT_BOOL_TYPES,ELEMENT_MENU_TYPES}