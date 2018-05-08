import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { WorkerService } from '../../services/worker.services';


@IonicPage()
@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class TiendaPage {
  picToView:string="../../assets/imgs/planta0.png";
  buttonColor: string = '#808080';
  buttonColorNoSeleccionado: string = '#DCDCDC';
  plantaSeleccionada:string = "planta0";
  planta0: string;
  planta1: string;
  planta2: string;
  planta3: string;
  planta4: string;
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
    this.actulizarSeleccionPlanta("0");
  }

  actulizarSeleccionPlanta(nuevaPlanta) {
    console.log("Cambiando imagen");
    this.planta0 = this.buttonColorNoSeleccionado;
    this.planta1 = this.buttonColorNoSeleccionado;
    this.planta2 = this.buttonColorNoSeleccionado;
    this.planta3 = this.buttonColorNoSeleccionado;
    this.planta4 = this.buttonColorNoSeleccionado;
    this.plantaSeleccionada = nuevaPlanta;
    for(let i=0; i < 4; i++){ 
      if(nuevaPlanta == "0")
        this.planta0 = this.buttonColor;
      if(nuevaPlanta == "1")
        this.planta1 = this.buttonColor;
      if(nuevaPlanta == "2")
        this.planta2 = this.buttonColor;
      if(nuevaPlanta == "3")
        this.planta3 = this.buttonColor;
      if(nuevaPlanta == "4")
        this.planta4 = this.buttonColor;
    }
  }

  changeView(numeroImagen){
    console.log(numeroImagen);
    this.actulizarSeleccionPlanta(numeroImagen);
    this.picToView="../../assets/imgs/planta"+numeroImagen+".png";
  }

}