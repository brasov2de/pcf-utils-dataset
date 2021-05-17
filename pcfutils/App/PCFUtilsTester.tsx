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
      
    const img1 = useResourceImage(resources, "images/twooptionscomposite/Main.png", "png"); 
   // const imgSrc2 = useResourceImage(resources, "images/twooptionscomposite/EditMode.png", "png");
   // const imgSrc3 = useResourceImage(resources, "images/colorfuloptionsetgrid/colorful-optionset-grid.png", "png");
    const chosenImageName = useEnvironmentVariable<string>(webAPI, "orb_chosedImage", EnvironmentVariableTypes.String);    
    console.log(`ChoseImgeName - envvar: ${chosenImageName}`);
    const { src, isLoading, errorMessage } = useResourceImage(resources, chosenImageName ?? "", "png");
    
   // console.log(`image: ${chosenImageName}`);
     
    return (isLoading===true || chosenImageName==null || chosenImageName=="undefined")
    ? (<div style={{width:"100%", height: "100%", backgroundColor:'yellow'}}>Loading....</div>)
    : (<div>  
        Chosen:     
        <img src={src}/>
       
        <hr/>
        Available: <br/>      
        <img src={img1.src}/>
       
        
    </div>)
}


