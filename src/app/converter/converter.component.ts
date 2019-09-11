import { Component, Input } from '@angular/core';

@Component({
  selector: 'convert',
  templateUrl: `converter.component.html`,
  styleUrls: ['converter.component.css']
})
export class ConverterComponent {
  @Input() name: string;

  constructor() {
    //this.converertToCSharpClass(this.obj)
  }
  val
  submit(value) {
    this.val = value.value
    try {
      JSON.parse(value.value);
    } catch (e) {
      alert('Pleas, enter a valid JSON')
      return false;
    }
    return true;
    this.converertToCSharpClass(value.value)
  }

  includeJsonProperty = false
  changeStatus(value) {
    this.includeJsonProperty = value
    if (this.val) {
      this.converertToCSharpClass(this.val)
    }

  }
  cSharpClassArray = []
  cSharpString = ''
  converertToCSharpClass(obj) {
    this.cSharpString = ''
    this.cSharpClassArray = []
    let textToJSON = JSON.parse(obj)
    Object.keys(textToJSON).forEach(element => {
      this.cSharpString = ''
      let capitalLetter = element.charAt(0).toUpperCase() + element.slice(1)
      if (typeof textToJSON[element] == 'number') {
        if (this.includeJsonProperty == true) {
          element = '[JsonProperty("' + element + '")]' + '\n' + ' ' + "public int" + ' ' + capitalLetter + ' ' + "{get; set;}"
        } else {
          element = "public int" + ' ' + element + ' ' + "{get; set;}"
        }
        this.cSharpString = this.cSharpString + ' ' + element
      } else if (typeof textToJSON[element] == 'string') {
        if (this.includeJsonProperty == true) {
          element = '[JsonProperty("' + element + '")]' + '\n' + ' ' + "public string" + ' ' + capitalLetter + ' ' + "{get; set;}"
        } else {
          element = "public string" + ' ' + element + ' ' + "{get; set;}"
        }

        this.cSharpString = this.cSharpString + ' ' + element
      } else {

        if (this.includeJsonProperty == true) {
          element = '[JsonProperty("' + element + '")]' + '\n' + ' ' + "public string" + ' ' + capitalLetter + ' ' + "{get; set;}"
        } else {
          element = "public string" + ' ' + element + ' ' + "{get; set;}"
        }
        this.cSharpString = this.cSharpString + ' ' + element
      }

      this.cSharpClassArray.push(this.cSharpString)
    });
    console.log(this.cSharpClassArray)
  }
}
