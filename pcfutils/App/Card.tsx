import * as React from 'react';


export interface ICardprops{
    title ?: string;
    imageSrc ?: string;
    id: string;  
    onClick: (id: string | null ) => void;
    isSelected: boolean;
}
export const Card = React.memo(({title, imageSrc, id, onClick, isSelected} : ICardprops)  : JSX.Element => {

    const selectIt= React.useCallback(()=>{        
        onClick(isSelected ? null : id);
    }, [id, isSelected]);
    return (<div className="card" key={id} onClick={selectIt} style={{color: isSelected?"red" : "black", borderColor: isSelected?"red" : "black"}}>
        <img src={imageSrc}/>
        <div>{title}</div> 
    </div>);

}, (oldProps, newProps)=>{
        return oldProps.imageSrc ===newProps.imageSrc && oldProps.isSelected===newProps.isSelected && oldProps.title===newProps.title
})