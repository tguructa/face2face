import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    tab1Root: any = 'CallPage';
    tab2Root: any = 'SettingsPage';
  

    constructor(public navCtrl: NavController) {

    }

}