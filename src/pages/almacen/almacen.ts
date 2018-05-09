import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the AlmacenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-almacen',
  templateUrl: 'almacen.html',
})
export class AlmacenPage {

  public picToView = "../../assets/imgs/mapaAlmacen.png";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlmacenPage');
  }

  enDesarrollo() {
    let alert2 = this.alertCtrl.create({
      title: "En desarrollo...",
    });
    alert2.present();
  }
}
