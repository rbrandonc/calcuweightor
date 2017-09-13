import { Component } from '@angular/core';
import { NavController, Events, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'add-weight',
  templateUrl: 'add.html'
})
export class AddWeight {
  plates;
  barWeight;

  imperial = [
    ".5", "1", "2.5", "5", "10", "15", "25", "35", "45"
  ]

  metric = [
    "1.25", "2.5", "5", "10", "15", "20", "25"
  ]

  standard: string = "lbs";

  constructor(public navCtrl: NavController, public event: Events,
    public navParams: NavParams, public alert: AlertController) {
      this.plates = navParams.get('plates');
      this.standard = navParams.get('standard');
      this.barWeight = navParams.get('barWeight');
      console.log(this.standard);
      console.log(this.plates);
  }

  changeBar() {
    console.log(this.barWeight);
    let alert = this.alert.create({
      title: 'Change Bar Weight',
      inputs: [
        {
          label: '45lbs',
          value: 'lbs22.5',
          type: "radio",
          checked: this.barWeight === "lbs22.5"
        },
        {
          label: '25lbs',
          value: 'lbs12.5',
          type: "radio",
          checked: this.barWeight === "lbs12.5"
        },
        {
          label: '20kgs',
          value: 'kgs10',
          type: "radio",
          checked: this.barWeight === "kgs10"
        },
        {
          label: '15kgs',
          value: 'kgs7.5',
          type: "radio",
          checked: this.barWeight === "kgs7.5"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            this.event.publish("changeBar", data);
          }
        }
      ]
    });
    alert.present();
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
