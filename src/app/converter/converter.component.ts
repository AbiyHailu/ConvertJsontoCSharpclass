import { Component, Input } from '@angular/core';

@Component({
  selector: 'convert',
  templateUrl: `converter.component.html`,
  styles: [`h1 { font-family: Lato; }`]
})
export class ConverterComponent {
  @Input() name: string;

  constructor() {
    //this.converertToCSharpClass(this.obj)
  }
  converted
  submit(value) {
    this.converted = value.value
    console.log(this.converted)
    this.converertToCSharpClass(this.converted)
  }
  includeJsonProperty = false
  changeStatus(value ){
    console.log(value)
      this.includeJsonProperty = value
  }


  y = []
  cSharpString = ''
  converertToCSharpClass(obj) {
    this.cSharpString = ''
    this.y=[]
    let textToJSON = JSON.parse(obj)
    Object.keys(textToJSON).forEach(element => {
      let capitalLetter = element.charAt(0).toUpperCase() + element.slice(1)
      if (typeof textToJSON[element] == 'number') {
        if (this.includeJsonProperty == true) {
          element = '[JsonProperty("' + element + '")]' + ' ' + "public int" + ' ' + capitalLetter + ' ' + "{get; set;}"
        } else {
          element = "public int" + ' ' + element + ' ' + "{get; set;}"
        }
        this.cSharpString = this.cSharpString + ' ' + element
      } else if (typeof textToJSON[element] == 'string') {
        if (this.includeJsonProperty == true) {
          element = '[JsonProperty("' + element + '")]' + ' ' + "public string" + ' ' + capitalLetter + ' ' + "{get; set;}"
        } else {
           element = "public string" + ' ' + element + ' ' + "{get; set;}"
        }

        this.cSharpString = this.cSharpString + ' ' + element
      } else {

        if (this.includeJsonProperty == true) {
          element = '[JsonProperty("' + element + '")]' + ' ' + "public string" + ' ' + capitalLetter + ' ' + "{get; set;}"
        } else {
           element = "public string" + ' ' + element + ' ' + "{get; set;}"
        }
        this.cSharpString = this.cSharpString + ' ' + element
      }
 this.y.push(this.cSharpString)
    });
    console.log("this.cSharpString", this.cSharpString)


  }
}
