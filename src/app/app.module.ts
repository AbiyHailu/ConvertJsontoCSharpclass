import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConverterComponent } from './converter/converter.component';
import { PipesModule}  from './pipes/pipes.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, PipesModule],
  declarations: [ AppComponent, ConverterComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
