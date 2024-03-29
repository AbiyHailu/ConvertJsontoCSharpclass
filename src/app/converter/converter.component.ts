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
    if (this.objtype == 'JSON') {
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
      if (this.objtype == 'JSON') {
        this.converertToCSharpClass(this.val)

      } else if (this.objtype == 'CSHARP') {
        this.converertToCSharpClasswithJson(this.val)
      }
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
  properties = []
  filterProperties = []

  converertToCSharpClasswithJson(str) {
    this.properties = []
    this.filterProperties = []
    this.cSharpClassArray = []
    this.properties = str.trim().split("{ get; set; }")
    this.properties.forEach(element => {
      element = element.replace(/{|}|"/g, "").trim();
      this.filterProperties.push(element)
    })
    let lowernew
    this.filterProperties.filter(e => e != "").forEach(element => {
      this.finalstring = ''
      let r = element.trim().split(" ")
      let name = r[r.length - 1]
      let strType = r[r.length - 2]
      let pub = r[r.length - 3]
      let lower = name.charAt(0).toLowerCase() + name.slice(1)
      for (let chr of lower) {
        if (chr == chr.toUpperCase()) {
          console.log(lower.split(chr)[0]+"_"+chr.toLowerCase()+lower.split(chr)[1]);
          lowernew = lower.split(chr)[0]+"_"+chr.toLowerCase()+lower.split(chr)[1]

        }
      }
      // let finstr = ' ' + pub + ' ' + strType + ' ' + name.charAt(0).toLowerCase()+name.slice(1)

      let finstr = ' ' + pub + ' ' + strType + ' ' + name.charAt(0).toUpperCase() + name.slice(1)

      let y
      if (this.includeJsonProperty == true) {
        y = '[JsonProperty("' + lower + '")]' + '\n' + finstr + ' ' + "{get; set;}"
      } else {
        y = finstr + ' ' + "{get; set;}"
      }
      this.finalstring = this.finalstring + y
      this.cSharpClassArray.push(this.finalstring)
    });
    console.log(this.cSharpClassArray)

  }


}
