import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  contactList=[];
  selectedRadioItem;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage
  ) {
    /* this.contactList = [{
      FullName: "Thiru",
      Mobile: "9841549605",
      email: " "
    },
    {
      FullName: "Sathish",
      Mobile: "9840714623",
      email: " "
    }
    ]; */

  }

  radioSelect(value) {
    console.log("radioSelect",value);
    this.selectedRadioItem = value;
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.selectedRadioItem);

  }
  ionViewWillEnter(){
    this.storage.get('Contacts').then((val)=>{
      this.contactList=val;
      console.log(val);

    })
  }
  ionViewDidLoad() {
   


    console.log('ionViewDidLoad ContactsPage');
  }

}
