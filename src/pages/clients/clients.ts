import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { WorkerService } from '../../services/worker.services';
import { PeticionCliente } from "../../models/peticionCliente.model";
import { ProductoCarrito } from "../../models/productoCarrito.model";

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  public requestsList: PeticionCliente[];
  public requestSelected: PeticionCliente;
  public carritoSelected: Array<ProductoCarrito>;
  public noCobrarButton = false;
  public recien = false;
  public selectedAll = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workerService: WorkerService,
    public alertCtrl: AlertController,
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
    console.log("ionViewWillEnter clients.ts");

    // Obtenemos los productos de su servicio y los almacenamos
    this.workerService.getRequests().snapshotChanges().subscribe(item => {
      this.requestsList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        console.log(x);
        this.requestsList.push(x as PeticionCliente);
      });
    });
  }

  openRequest(request) {
    this.recien = false;
    console.log("openRequest");
    this.requestSelected = request;
    this.carritoSelected = [];

    if (this.requestSelected.tipo == "peticionPagoEnMano" || this.requestSelected.tipo == "peticionPagoRecoge") {
      if(this.requestSelected.tipo == "peticionPagoEnMano") this.selectedAll = true;
      else this.selectedAll = false;
      
      this.noCobrarButton = true;
      this.workerService.getCarritoUsuario(this.requestSelected.key).snapshotChanges().subscribe(item => {
        item.forEach(element => {
          let x = element.payload.toJSON();
          this.carritoSelected.push(x as ProductoCarrito);
        });
      });
    } else{
      this.noCobrarButton = false;
    }
  }

  resuelta(){
    let alert2 = this.alertCtrl.create({
      title: "¿Quieres confirmar la resolución de la petición?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.workerService.deleteRequestClient(this.requestSelected.key);
            this.requestSelected = null;
            this.recien = true;
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No selected!');
          }
        }
      ]
    });
    alert2.present();
  }

  cobrar(){
    let alert2 = this.alertCtrl.create({
      title: "Pago realizado.",
      message: "¿Quieres confirmar la resolución de la petición?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.workerService.deleteRequestClient(this.requestSelected.key);
            this.requestSelected = null;
            this.recien = true;
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No selected!');
          }
        }
      ]
    });
    alert2.present();
  }

  cancelar(){
    let alert2 = this.alertCtrl.create({
      title: "¿Seguro que quieres dejar de atender a este cliente?",
      message: "La petición no se eliminará",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.requestSelected = null;
            this.recien = true;
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No selected!');
          }
        }
      ]
    });
    alert2.present();
  }

  enDesarrollo() {
    let alert2 = this.alertCtrl.create({
      title: "En desarrollo...",
    });
    alert2.present();
  }

}