import * as React from 'react';
import {useEnvironmentVariable, useResourceImage, usePaging} from "@dianamics/pcf-utils";
import { EnvironmentVariableTypes } from '@dianamics/pcf-utils';
import { Card } from './Card';

type DataSet = ComponentFramework.PropertyTypes.DataSet;
export interface IPCFTesterProps{
    webAPI: any;
    dataset: DataSet;
    resources: any;
}

export const PCFUtilsTester = ({webAPI, dataset, resources} : IPCFTesterProps)  : JSX.Element => {
    console.log("entered PCFUtilsTester");    
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    //const s1 = useResourceImage(resources, "images/skating/s1.png", "png");

    const images = ["3","4", "5", "9", "1", "2", "7", "8", "10"].map((n)=>{
        return useResourceImage(resources, `images/skating/s${n}.png`, "png")
    });

    const mySVG = useResourceImage(resources, "images/My.svg", "svg");  

    const envVar = useEnvironmentVariable<string>(webAPI, "orb_chosedImage", EnvironmentVariableTypes.String, true);       
    const { currentPage, moveNext, movePrevious} = usePaging(dataset);
    
    //console.log(`ChoseImgeName - envvar: ${envVar.value}`);
    
    /*const { src, isLoading, errorMessage } = useResourceImage(resources,  envVar.value ?? "", "png");
    if(errorMessage){
        console.error(`could not load environment variable: ${errorMessage}`);
    }
    */
    //const isOverallLoading= envVar.isLoading || images.some((image)=> image.isLoading===true);

    //console.log(`isOverallLoading: ${isOverallLoading}`);
    //console.log(images);
console.log(dataset.sortedRecordIds.length);

    const selectIt = React.useCallback((id : string | null ) => {        
        if(id==null){
            dataset.clearSelectedRecordIds();
            setSelectedIds([]);
        }
        else{
            dataset.setSelectedRecordIds([id]);
            setSelectedIds([id]);
        }
    }, [])
    if(dataset.loading){
        return <div>Loading...</div>
    }
    return (<div>              
        <img src={mySVG.src}/> {envVar.value}   <hr/>
        <button onClick={movePrevious}>Prev</button>
        Page:{currentPage}           
        <button onClick={moveNext}>Next</button> 
        <div className="wrapper">
        {dataset.sortedRecordIds.map((id, i)=>{
            return <Card key={id}  id={id} imageSrc={images[i % images.length].src} onClick={selectIt} isSelected={selectedIds.includes(id)} title={dataset.records[id].getFormattedValue("orb_name")} />
        })}           
        </div>                
    </div>)
}




/* {images.map((img)=> (<div className="card"><img src={img.src}/></div>))}      

 ? (<div style={{width:"100%", height: "100%", fontSize:"300%"}}>Loading....</div>)
 */