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
    const imgSrc1 = useResourceImage(resources, "images/twooptionscomposite/Main.png", "png");
    const imgSrc2 = useResourceImage(resources, "images/twooptionscomposite/EditMode.png", "png");
    //const imgSrc3 = useResourceImage(resources, "images/colorfuloptionsetgrid/colorful-optionset-grid.png", "png");
    const chosenImageName = useEnvironmentVariable<string>(webAPI, "orb_chosedImage", EnvironmentVariableTypes.String) ?? "";
    const imgChosen = useResourceImage(resources, chosenImageName, "png");
    return (<div>
        Chosen:
        <img src={imgChosen}/>
        Available: <br/>
        <img src={imgSrc1}/>
        <img src={imgSrc2}/>        
    </div>)
}


