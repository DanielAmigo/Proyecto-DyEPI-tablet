import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { WorkerService } from '../../services/worker.services';


@IonicPage()
@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class TiendaPage {
  plantas: Array<{ name: string, url: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workerService: WorkerService,
    public alertCtrl: AlertController
  ) {
    console.log("Constructor Clients.ts");
    if (!this.workerService.authenticated) {      // Comprobamos que estemos logueados
      console.log("¡No estamos logueados!");
      this.navCtrl.setRoot("LoginPage");
      let alert2 = this.alertCtrl.create({
        title: "Necesitas haber iniciado sesión para utilizar el sistema."
      });
      alert2.present();
    }

    this.plantas = [
      { name: 'Planta 0', url: "../../assets/imgs/planta0.png" },
      { name: 'Planta 1', url: "../../assets/imgs/planta1.png" },
      { name: 'Planta 2', url: "../../assets/imgs/planta2.png" },
      { name: 'Planta 3', url: "../../assets/imgs/planta3.png" },
    ];

  }

  actulizarSeleccionPlanta(nuevaPlanta) {
    console.log("Cambiando imagen");

  }
}
