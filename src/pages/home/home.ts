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
  plates;

  constructor(public navCtrl: NavController, public event: Events) {
    this.event.subscribe('addWeight', (item: string) => {
      this.plates[item]++;
      this.total += item.substring(0, 3) === this.standard || item.substring(0, 3) === this.standard + 's' ?
        2*parseFloat(item.substring(3, item.length)) :
        2*this.convert(item.substring(0, 3), parseFloat(item.substring(3, item.length)));
        this.formatTotal();
    })

    this.event.subscribe('removeWeight', (item) => {
      console.log(this.plates[item], item);
      if(this.plates[item] > 0){
        console.log('asdf');
        this.plates[item]--;
        this.total -= item.substring(0, 3) === this.standard || item.substring(0, 3) === this.standard + 's' ?
          2*parseFloat(item.substring(3, item.length)) :
          2*this.convert(item.substring(0, 3), parseFloat(item.substring(3, item.length)));
        this.formatTotal();
      }
    })

    this.event.subscribe('resetWeight', () => {
      this.resetWeight();
    })
  }

  ngOnInit() {
    this.resetWeight();
  }

  formatTotal() {
    this.formattedTotal = this.total.toString() === this.total.toString().substring(0, this.total.toString().indexOf('.'))
    ? this.total.toString() : this.total.toFixed(2);
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
      console.log(this.plates);
      for(let i in this.plates) {
        this.plates[i] = 0;
      }
      console.log(this.plates);
    }
  }

  add() {
    this.navCtrl.push(AddWeight, {plates: this.plates, standard: this.standard});
  }

  convert(from, weight) {
    console.log(from, weight);
    if(from === 'lbs') {
      console.log('convert from lbs')
      return weight/2.2046;
    }
    if(from === 'kgs' || from === 'kg') {
      console.log('convert from kg')
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

  getWeight() {

  }

  getPlates() {

  }

}
