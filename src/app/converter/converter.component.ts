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
    if (this.objtype == 'JSON') {
      this.val = value.value
      try {
        JSON.parse(value.value);
        this.converertToCSharpClass(value.value)
      } catch (e) {
        alert('Pleas, enter a valid JSON')
        return false;
      }
    
    } else if (this.objtype == 'CSHARP') {
      this.converertToCSharpClasswithJson(value.value)
    } else {
      alert('Pleas, select type JSON or C#')
    }

  }

  includeJsonProperty = false
  changeStatus(value) {
    this.includeJsonProperty = value
    if (this.val) {
      this.converertToCSharpClass(this.val)
    }
  }

  objtype
  onRadioChange(value) {
    this.objtype = value
    console.log(this.objtype)
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


  finalstring = ''
  converertToCSharpClasswithJson(str) {
    this.finalstring =''
    this.cSharpClassArray = []
    var x = str.trim().split("{ get; set; }").filter(e => e != "")
    console.log(x)
    x.forEach(element => {
      let r = element.trim().split(" ")
      let name = r[r.length - 1]
      let type = r[r.length - 2]
      let pub = r[r.length - 3]
      let upper = name.charAt(0).toUpperCase() + name.slice(1)
      let finstr = pub + ' ' + type + ' ' + name
      let y = '[JsonProperty("' + upper + '")]' + finstr + ' ' + "{get; set;}"

      this.finalstring = this.finalstring + y
      //  console.log('this.finalstring', this.finalstring)
      this.cSharpClassArray.push(this.finalstring)
    });
    // let r = Object.assign({}, ...[this.cSharpClassArray])
    //  console.log(r)
  }




}
