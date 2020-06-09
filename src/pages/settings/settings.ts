import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  RegistrationID;
  apiRTCKey;
  ContactList = [];
  ContactName;
  ContactPhone;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController) {
  }

  clearContactFields() {
    this.ContactName = "";
    this.ContactPhone = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  settingsAlert(alertMessage) {
    let alert = this.alertCtrl.create({
      title: 'Settings',
      subTitle: alertMessage,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  GetContacts() {
    return this.storage.get('Contacts');
  }

  SaveContacts(contactName, contactPhone) {
    this.GetContacts().then((val) => {
      if (val == null) {
        this.ContactList.push({ "contactName": contactName, "contactPhone": contactPhone });
        console.log('GetContacts ' + val);
        console.log({ "contactName": contactName, "contactPhone": contactPhone });
        this.storage.set('Contacts', this.ContactList);
      }
      else {
        this.ContactList = val;
        console.log('GetContacts in' + val);
        this.ContactList.push({ "contactName": contactName, "contactPhone": contactPhone });
        this.storage.set('Contacts', this.ContactList);
      };
      this.settingsAlert("Contacts saved!");

    });


  }

  SaveRegistrationID(RegistrationID) {
    this.storage.set('RegistrationID', RegistrationID);
    this.settingsAlert("Registration ID saved!");
    this.clearContactFields();
  }

}
