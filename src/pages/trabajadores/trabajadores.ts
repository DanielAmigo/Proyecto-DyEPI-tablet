import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { WorkerService } from '../../services/worker.services';


@IonicPage()
@Component({
  selector: 'page-trabajadores',
  templateUrl: 'trabajadores.html',
})
export class TrabajadoresPage {

  public workersList: Worker[];
  public workerSelected: Worker;

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
  }

  public ionViewWillEnter() {   // En vez de ngInit porque esto es cada vez que se pone visible!!
    console.log("ionViewWillEnter trabajadores.ts");

    // Obtenemos los productos de su servicio y los almacenamos
    this.workerService.getWorkers().snapshotChanges().subscribe(item => {
      this.workersList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        console.log(x);
        this.workersList.push(x as Worker);
      });
    });
  }

  openWorker(worker) {
    console.log("openWorker");
    this.workerSelected = worker;
  }

}