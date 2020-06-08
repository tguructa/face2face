import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  character;
  contactList: any;
  selectedRadioItem;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.contactList = [{
      FullName: "Thiru",
      Mobile: "9841549605",
      email: " "
    },
    {
      FullName: "Sathish",
      Mobile: "9840714623",
      email: " "
    }
    ];
    // this.character = characters[this.params.get('charNum')];
  }

  radioSelect(value) {
    console.log("radioSelect",value);
    this.selectedRadioItem = value;
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.selectedRadioItem);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
