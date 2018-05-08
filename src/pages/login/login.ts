import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Worker } from "../../models/worker.model";
import { AngularFireAuth } from 'angularfire2/auth';
import { ClientsPage } from '../clients/clients';
import { WorkerService } from '../../services/worker.services';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as Worker;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public workerService: WorkerService,
    public alertCtrl: AlertController
  ) {
    this.user.email = "marta.ruiz@primark.com";       // QUITARLO PARA CUANDO ENTREGUEMOSSS
    this.user.password = "123123";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: Worker) {   // Boton login en Firebase
    if (user.email.split("@").length > 1) {               // Prevención de errores
      if (user.email.split("@")[1] == "primark.com") {
        console.log("Cuenta de Primark.");
        try {
          const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
          if (result) {
            this.navCtrl.setRoot("ClientsPage");
          }
        }
        catch (e) {
          let alert2 = this.alertCtrl.create({
            title: "Debes utilizar una cuenta registrada en el sistema."
          });
          alert2.present();
          console.error(e);
        }
      }
      else {
        let alert2 = this.alertCtrl.create({
          title: "Debes utilizar una cuenta de Primark."
        });
        alert2.present();
      }
    } else {
      let alert2 = this.alertCtrl.create({
        title: "Debes utilizar una cuenta de Primark."
      });
      alert2.present();
    }

  }

  saltarLogin() {          // Para obtener el alert de necesitar login
    this.navCtrl.setRoot("ClientsPage");
  }

  async register(user: Worker) {  // Boton registrar en Firebase
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.workerService.registerButton(user);    // GENERA EL OBJETO Worker y lo guarda en Firebase
        this.navCtrl.setRoot("ClientsPage");
      }
    } catch (e) {
      let alert2 = this.alertCtrl.create({
        title: "El usuario debe ser un correo electrónico."
      });
      alert2.present();
      console.error(e);
    }

  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    this.menu.enable(true);
  }
}