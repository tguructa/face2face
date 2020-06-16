import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';



//import "../../assets/apiRTC-latest.min.js";
/**
 * Generated class for the CallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var apiRTC: any;

@IonicPage()
@Component({
  selector: 'page-call',
  templateUrl: 'call.html',
})
export class CallPage {

  showCall:boolean = true;
  showHangup: boolean= true;
  showAnswer:boolean = true;
  showReject: boolean = true;
  showStatus:boolean = true;
  showRemoteVideo: boolean = true;
  showMyVideo: boolean = true;

  session;
  webRTCClient;
  incomingCallId = 0;
  myCallId;
  status;
  calleeId;
  RegistrationID = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeAudio: NativeAudio,
    public modalController: ModalController,
    private storage: Storage,
    private alertCtrl: AlertController,
    
    ) {
  }

  NoRegistrationIDAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registration Required!',
      subTitle: 'Please go to Settings and Register your Phone Number',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  async  openModal() {
    const contactModel = await this.modalController.create('ContactsPage');

    contactModel.onDidDismiss(data => {
      
      this.calleeId = data;
      console.log(data);

    });
    return await contactModel.present();
  }

  ionViewWillEnter() {
    if( this.RegistrationID ==null){
      this.RegisterUser();

    }
  
    console.log('ionViewWillEnter CallPage');
  }

  GetRegistrationID(){
    return this.storage.get('RegistrationID');

  }

  RegisterUser(){

    this.GetRegistrationID().then((val) => {
      this.RegistrationID = val;
      console.log('RegistrationID', this.RegistrationID);
      if(this.RegistrationID!=null){
        this.InitializeApiRTC(this.RegistrationID);
        }
        else {
          this.NoRegistrationIDAlert();
        }
    },(err) => { 
      console.log(err) 
    })

  }

  ionViewDidLoad() {
   
    this.RegisterUser();
    this.nativeAudio.preloadComplex('Tone1', 'assets/audio/tone.mp3', 1, 1, 0).then((succ) => {
      console.log("suu", succ)
    }, (err) => {
      console.log("err", err)
    });

    console.log('ionViewDidLoad CallPage');
  }

  InitializeApiRTC(papiCCId) {

    apiRTC.init({
      apiKey: "b1c7afd3d2f5a7c7ffc1dda28e0d352a",
      apiCCId: papiCCId,
      onReady: (e) => {
        this.sessionReadyHandler(e);
      }
    });

  }

  sessionReadyHandler(e) {

    this.myCallId = apiRTC.session.apiCCId;
    this.InitializeControls();
    this.AddEventListeners();
    this.InitializeWebRTCClient();
  }

  InitializeWebRTCClient() {
    this.webRTCClient = apiRTC.session.createWebRTCClient({
      status: "status" //Optionnal
    });
    /*    this.webRTCClient.setAllowMultipleCalls(true);
        this.webRTCClient.setVideoBandwidth(300);
        this.webRTCClient.setUserAcceptOnIncomingCall(true);*/
  }

  InitializeControls() {
    this.showCall = true;
    this.showAnswer = false;
    this.showHangup = false;
    this.showReject = false;
  }

  InitializeControlsForIncomingCall() {
    this.showCall = false;
    this.showAnswer = true;
    this.showReject = true;
    this.showHangup = true;
    this.nativeAudio.loop('uniqueI1').then((succ) => {
      console.log("succ", succ)
    }, (err) => {
      console.log("err", err)
    });

  }

  InitializeControlsForHangup() {
    this.showCall = true;
    this.showAnswer = false;
    this.showReject = false;
    this.showHangup = false;
  }

  UpdateControlsOnAnswer() {
    this.showAnswer = false;
    this.showReject = false;
    this.showHangup = true;
    this.showCall = false;
  }

  UpdateControlsOnReject() {
    this.showAnswer = false;
    this.showReject = false;
    this.showHangup = false;
    this.showCall = true;
  }

  RemoveMediaElements(callId) {
    this.webRTCClient.removeElementFromDiv('mini', 'miniElt-' + callId);
    this.webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + callId);
  }

  AddStreamInDiv(stream, callType, divId, mediaEltId, style, muted) {
    let mediaElt = null;
    let divElement = null;

    if (callType === 'audio') {
      mediaElt = document.createElement("audio");
    } else {
      mediaElt = document.createElement("video");
    }

    mediaElt.id = mediaEltId;
    mediaElt.autoplay = true;
    mediaElt.muted = muted;
    mediaElt.style.width = style.width;
    mediaElt.style.height = style.height;

    divElement = document.getElementById(divId);
    divElement.appendChild(mediaElt);

    this.webRTCClient.attachMediaStream(mediaElt, stream);
  }

  AddEventListeners() {
    apiRTC.addEventListener("userMediaSuccess", (e) => {
      this.showStatus = true;
      this.showMyVideo = true;

      this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "mini", 'miniElt-' + e.detail.callId, {
        width: "128px",
        height: "96px"
      }, true);

    });

    apiRTC.addEventListener("userMediaError", (e) => {
      this.InitializeControlsForHangup();

      this.status = this.status + "<br/> The following error has occurred <br/> " + e;
    });

    apiRTC.addEventListener("incomingCall", (e) => {
      this.InitializeControlsForIncomingCall();
      this.incomingCallId = e.detail.callId;
    });

    apiRTC.addEventListener("hangup", (e) => {
      if (e.detail.lastEstablishedCall === true) {
        this.InitializeControlsForHangup();
      }
      this.status = this.status + "<br/> The call has been hunged up due to the following reasons <br/> " + e.detail.reason;
      this.RemoveMediaElements(e.detail.callId);
    });

    apiRTC.addEventListener("remoteStreamAdded", (e) => {
      this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "remote", 'remoteElt-' + e.detail.callId, {
        width: "300px",
        height: "225px"
      }, false);
    });

    apiRTC.addEventListener("webRTCClientCreated", (e) => {
      console.log("webRTC Client Created");
      this.webRTCClient.setAllowMultipleCalls(true);
      this.webRTCClient.setVideoBandwidth(300);
      this.webRTCClient.setUserAcceptOnIncomingCall(true);

      /*      this.InitializeControls();
            this.AddEventListeners();*/

      //this.MakeCall("729278");
    });

  }

  MakeCall(calleeId) {
    var callId = this.webRTCClient.call(calleeId);
    if (callId != null) {
      this.incomingCallId = callId;
      this.showHangup = true;
    }
  }

  HangUp() {
    this.webRTCClient.hangUp(this.incomingCallId);
  }

  AnswerCall(incomingCallId) {
    this.webRTCClient.acceptCall(incomingCallId);
    this.nativeAudio.stop('uniqueI1').then(() => { }, () => { });

    this.UpdateControlsOnAnswer();
  }

  RejectCall(incomingCallId) {
    this.webRTCClient.refuseCall(incomingCallId);
    this.UpdateControlsOnReject();
    this.RemoveMediaElements(incomingCallId);
  }





}
