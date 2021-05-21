import * as React from 'react';
import {useEnvironmentVariable, useResourceImage, usePaging, useResourceImages} from "@dianamics/pcf-utils";
import { EnvironmentVariableTypes } from '@dianamics/pcf-utils';
import { Card } from './Card';

type DataSet = ComponentFramework.PropertyTypes.DataSet;
export interface IPCFTesterProps{
    webAPI: any;
    dataset: DataSet;
    resources: any;
}

const imageNames = ["3","4", "5", "9", "1", "2", "7", "8", "10"].map((n)=> `images/skating/s${n}.png`);

 /*    const images = ["3","4", "5", "9", "1", "2", "7", "8", "10"].map((n)=>{
        return useResourceImage(resources, `images/skating/s${n}.png`, "png")
    });*/


export const PCFUtilsTester = React.memo(({webAPI, dataset, resources} : IPCFTesterProps)  : JSX.Element => {
    console.log("entered PCFUtilsTester");    
    const envVar = useEnvironmentVariable<string>(webAPI, "orb_chosedImage", EnvironmentVariableTypes.String);  
    const mySVG = useResourceImage(resources, "images/My.svg", "svg");  
    const images = useResourceImages(resources, imageNames, "png");
  
        
    const { currentPage, moveNext, movePrevious} = usePaging(dataset);
      
    const [selectedIds, setSelectedIds] = React.useState<string[]>(dataset.getSelectedRecordIds());
    
    const selectIt = React.useCallback((id : string | null ) => {        
        if(id==null){
            dataset.clearSelectedRecordIds();
            setSelectedIds([]);
        }
        else{
            dataset.setSelectedRecordIds([id]);
            setSelectedIds([id]);
        }
    }, []);

    if(dataset.loading){
        console.log("loading");
        return <div>Loading...</div>
    }
    return (<div>              
        <img src={mySVG.src}/> {envVar.value}   <hr/>
        <button onClick={movePrevious}>Prev</button>
        Page:{currentPage}           
        <button onClick={moveNext}>Next</button> 

        <div className="wrapper">
        {dataset.sortedRecordIds.map((id, i)=>{
            return <Card key={id}  id={id} imageSrc={images[i % images.length]} onClick={selectIt} isSelected={selectedIds.includes(id)} title={dataset.records[id].getFormattedValue("orb_name")} />
        })}           
        </div>                
    </div>)
}, (prev, next) => {
    return prev.dataset===next.dataset
});




/* {images.map((img)=> (<div className="card"><img src={img.src}/></div>))}      

 ? (<div style={{width:"100%", height: "100%", fontSize:"300%"}}>Loading....</div>)

   //console.log(`ChoseImgeName - envvar: ${envVar.value}`);
    
    const { src, isLoading, errorMessage } = useResourceImage(resources,  envVar.value ?? "", "png");
    if(errorMessage){
        console.error(`could not load environment variable: ${errorMessage}`);
    }
   
    //const isOverallLoading= envVar.isLoading || images.some((image)=> image.isLoading===true);

    //console.log(`isOverallLoading: ${isOverallLoading}`);
    //console.log(images);
 */