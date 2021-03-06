import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { WorkerService } from '../../services/worker.services';


@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
})
export class EstadisticasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workerService: WorkerService,
    public alertCtrl: AlertController
  ) {
    console.log("Constructor Clients.ts");
    if(!this.workerService.authenticated){      // Comprobamos que estemos logueados
      console.log("¡No estamos logueados!");
      this.navCtrl.setRoot("LoginPage");
      let alert2 = this.alertCtrl.create({
        title: "Necesitas haber iniciado sesión para utilizar el sistema."
      });
      alert2.present();
    }
  }

}