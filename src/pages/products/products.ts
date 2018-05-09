import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { WorkerService } from '../../services/worker.services';

import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.services';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  productList: Producto[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workerService: WorkerService,
    public productoService: ProductoService,
    public alertCtrl: AlertController
  ) {
    console.log("Constructor Products.ts");
    if(!this.workerService.authenticated){      // Comprobamos que estemos logueados
      console.log("¡No estamos logueados!");
      this.navCtrl.setRoot("LoginPage");
      let alert2 = this.alertCtrl.create({
        title: "Necesitas haber iniciado sesión para utilizar el sistema."
      });
      alert2.present();
    }
    
  }

  public ionViewWillEnter() {   // En vez de ngInit porque esto es cada vez que se pone visible!!
    console.log("ionViewWillEnter catalogo.ts");

    // Obtenemos los productos de su servicio y los almacenamos
    this.productoService.getProducts()
    .snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["key"] = element.key;
        this.productList.push(x as Producto);
      });
    });
  }


  openProducto(object: Producto){   // Al hacer click en un producto, te lleva a dicha vista.
    console.log("Pasamos a ProductoPage: "+object.referencia);
    this.navCtrl.push('ProductPage', {producto: object.referencia});  // No se puede rootNavCtrl, sino no va.
  }

  enDesarrollo() {
    let alert2 = this.alertCtrl.create({
      title: "En desarrollo...",
    });
    alert2.present();
  }

}
