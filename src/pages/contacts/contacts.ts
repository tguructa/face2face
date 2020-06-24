import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Contact } from '../../model/contact';

import { ContactsProvider } from '../../providers/contacts/contacts'
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

  contacts: Contact[];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private storage: Storage,
    private contactProvider: ContactsProvider
  ) {
   
    this.storage.get('Contacts').then((val)=>{
      this.contactList=val;
      console.log(val);

    })
  }

  ionViewDidLoad() {
    this.getContacts();
    console.log('ionViewDidLoad ContactsPage');
  }
  radioSelect(value) {
    console.log("radioSelect",value);
    this.selectedRadioItem = value;
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.selectedRadioItem);
  }

  getContacts(): void {
    this.contactProvider.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }
}
