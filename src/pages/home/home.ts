import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AddWeight } from './add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  total: number = 0;
  standard: string = "lbs"
  formattedTotal: string;
  barWeight = "lbs22.5";
  firstLaunch = "false";
  plates;

  constructor(public navCtrl: NavController, public event: Events) {
    this.event.subscribe('addWeight', (item) => this.addPlate(item));

    this.event.subscribe('removeWeight', (item) => this.removePlate(item));

    this.event.subscribe('changeBar', (weight) => {
      this.removeWeight(this.barWeight);
      this.addWeight(weight);
      this.barWeight = weight;
    })

    this.event.subscribe('resetWeight', () => {
      this.resetWeight();
    })
    console.log(window.localStorage.getItem('firstlaunch'))
    this.firstLaunch = window.localStorage.getItem('firstlaunch') || 'true';
    console.log(this.firstLaunch);
  }

  closeTips() {
    this.firstLaunch = 'false';
    window.localStorage.setItem('firstlaunch', 'false');
  }

  addPlate(item: string) {
    this.addWeight(item);
    this.plates[item]++;
  }

  removePlate(item: string) {
    if(this.plates[item] > 0){
      this.removeWeight(item);
      this.plates[item]--;
    }
  }

  addWeight(item: string) {
    this.total += item.substring(0, 3) === this.standard || item.substring(0, 3) === this.standard + 's' ?
      2*parseFloat(item.substring(3, item.length)) :
      2*this.convert(item.substring(0, 3), parseFloat(item.substring(3, item.length)));
      this.formatTotal();
  }

  removeWeight (item) {
    this.total -= item.substring(0, 3) === this.standard || item.substring(0, 3) === this.standard + 's' ?
      2*parseFloat(item.substring(3, item.length)) :
      2*this.convert(item.substring(0, 3), parseFloat(item.substring(3, item.length)));
    this.formatTotal();
  }

  ngOnInit() {
    this.resetWeight();
  }

  formatTotal() {
    this.formattedTotal = this.total.toString() === this.total.toString().substring(0, this.total.toString().indexOf('.'))
    ? this.total.toString() : this.total.toFixed(2);
  }

  getPlates() {
    var sorted = Object.keys(this.plates).sort((a, b) => {
      var weighta = a.substring(0,3) == "lbs" ? parseFloat(a.substring(3, a.length)) : this.convert("kgs", parseFloat(a.substring(3, a.length)));
      var weightb = b.substring(0,3) == "lbs" ? parseFloat(b.substring(3, b.length)) : this.convert("kgs", parseFloat(b.substring(3, b.length)));
      if(weighta > weightb) return 1;
      if(weighta < weightb) return -1;
      return 0;
    });
    console.log(sorted)
    return sorted;
  }

  getNumPlates(plate) {
    console.log(plate, this.plates[plate])
    var temp = Array(this.plates[plate]).fill(0);
    // console.log(temp);
    return temp;
  }

  plateSize(a) {
    var weight =  a.substring(0,3) == "lbs" ? parseFloat(a.substring(3, a.length)) : this.convert("kgs", parseFloat(a.substring(3, a.length)));
    // console.log(weight);plateExtraSmall
    if(weight > 0  && weight <= 15) return "plateExtraSmall";
    if(weight > 15  && weight <= 25) return "plateSmall";
    if(weight > 25 && weight <= 35) return "plateMedium";
    if(weight > 35) return "plateLarge";
  }

  resetWeight(){
    this.total = 0;
    if(!this.plates) {
      this.plates = {
        lbs45: 0,
        lbs35: 0,
        lbs25: 0,
        lbs15: 0,
        lbs10: 0,
        lbs5: 0,
        "lbs2.5": 0,
        lbs1: 0,
        "lbs.5": 0,
        "kgs1.25": 0,
        "kgs2.5": 0,
        kgs5: 0,
        kgs10: 0,
        kgs15: 0,
        kgs20: 0,
        kgs25: 0
      }
    } else {
      // console.log(this.plates);
      for(let i in this.plates) {
        this.plates[i] = 0;
      }
      // console.log(this.plates);
    }
    this.addWeight(this.barWeight);
  }

  add() {
    this.navCtrl.push(AddWeight, {plates: this.plates, standard: this.standard, barWeight: this.barWeight});
  }

  convert(from, weight) {
    // console.log(from, weight);
    if(from === 'lbs') {
      // console.log('convert from lbs')
      return weight/2.2046;
    }
    if(from === 'kgs' || from === 'kg') {
      // console.log('convert from kg')
      return weight*2.2046;
    }
  }

  toggleStandard() {
    this.total = this.convert(this.standard, this.total);

    if(this.standard === 'lbs') {
      this.standard = 'kgs'
    } else {
      this.standard = 'lbs'
    }
  }
}
