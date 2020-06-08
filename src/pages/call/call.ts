import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, ViewController, ModalController} from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';


/**
 * Generated class for the CallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  showCall: boolean = true;
  showHangup: boolean = true;
  showAnswer: boolean = true;
  showReject: boolean = true;
  showStatus: boolean;
  showRemoteVideo: boolean = true;
  showMyVideo: boolean = true;

  session;
  webRTCClient;
  incomingCallId = 0;
  myCallId;
  status;
  calleeId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio) {
  }

  InitializeApiRTC() {
    //todo
  }

  sessionReadyHandler(e) {
    //todo
  }

  InitializeWebRTCClient() {
    //todo
  }

  InitializeControls() {
    //todo
  }

  InitializeControlsForIncomingCall() {
    //todo
  }

  InitializeControlsForHangup() {
    //todo
  }

  UpdateControlsOnAnswer() {
    //todo
  }

  UpdateControlsOnReject() {
    //todo
  }

  RemoveMediaElements(callId) {
    //todo
  }

  AddStreamInDiv(stream, callType, divId, mediaEltId, style, muted) {
    //toto
  }

  AddEventListeners() {
    //todo
  }

  MakeCall(calleeId) {
    ///todo
  }

  HangUp() {
    //todo
  }

  AnswerCall(incomingCallId) {
    //todo
  }

  RejectCall(incomingCallId) {
    //todo
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CallPage');
  }

}
