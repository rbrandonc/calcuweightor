import { Component } from '@angular/core';
import { NavController, Events, NavParams  } from 'ionic-angular';

@Component({
  selector: 'add-weight',
  templateUrl: 'add.html'
})
export class AddWeight {
  plates;

  imperial = [
    ".5", "1", "2.5", "5", "10", "15", "25", "35", "45"
  ]

  metric = [
    "1.25", "2.5", "5", "10", "15", "20", "25"
  ]

  standard: string = "lbs";

  constructor(public navCtrl: NavController, public event: Events,
    public navParams: NavParams) {
      this.plates = navParams.get('plates');
      this.standard = navParams.get('standard');
      console.log(this.standard);
      console.log(this.plates);
  }

  add(item) {
    this.event.publish('addWeight', item);
  }

  remove(item) {
    this.event.publish('removeWeight', item);
  }

  clear() {
    console.log(this.standard);
    this.event.publish('resetWeight');
  }
}
