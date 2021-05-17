import * as React from 'react';
import {useResourceImage} from  '@dianamics/pcf-utils';
import {useEnvironmentVariable} from "@dianamics/pcf-utils";
import { EnvironmentVariableTypes } from '@dianamics/pcf-utils';

type DataSet = ComponentFramework.PropertyTypes.DataSet;
export interface IPCFTesterProps{
    webAPI: any;
    dataset: DataSet;
    resources: any;
}

export const PCFUtilsTester = ({webAPI, dataset, resources} : IPCFTesterProps)  : JSX.Element => {
    console.log("entered PCFUtilsTester");    
      
    const s1 = useResourceImage(resources, "images/skating/s1.png", "png");
    const images = ["3","4", "5", "9"].map((n)=>{
        return useResourceImage(resources, `images/skating/s${n}.png`, "png")
    })
    const mySVG = useResourceImage(resources, "images/My.svg", "svg");  
    const chosenImageName = useEnvironmentVariable<string>(webAPI, "orb_chosedImage", EnvironmentVariableTypes.String);    
    console.log(`ChoseImgeName - envvar: ${chosenImageName}`);
    
    const { src, isLoading, errorMessage } = useResourceImage(resources, chosenImageName ?? "", "png");
    
   const isOverallLoading= s1.isLoading || images.some((image)=> image.isLoading===true);
    console.log(`isOverallLoading: ${isOverallLoading}`);
    console.log(images);
    return isOverallLoading===true
    ? (<div style={{width:"100%", height: "100%", backgroundColor:'yellow'}}>Loading....</div>)
    : (<div>  
        Chosen:     
        <img src={src}/>       
        <img src={mySVG.src}/>       

        <hr/>
        Available: <br/>      
        <img src={s1.src}/>
        {images.map((img)=> (<img src={img.src}/>))}       
                       
    </div>)
}


