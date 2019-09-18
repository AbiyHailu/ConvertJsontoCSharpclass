import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule} from "@angular/common";
import {ReplaceLineBreaks}  from "./replaceLineBreaks";

 
const PIPES = [
  ReplaceLineBreaks
  ];
@NgModule({

  imports:[
    CommonModule
  ],

  exports:[ 
   PIPES
    ],

  declarations:[
    ...PIPES
    ],
})

export class PipesModule{

}