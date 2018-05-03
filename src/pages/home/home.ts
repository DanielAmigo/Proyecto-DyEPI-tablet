import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  root = 'ClientsPage';
  pages: Array<{title: string, component: string, selected: boolean}>;
  className: string = "";

  constructor(public navCtrl: NavController) {
    console.log("home ts constructor");

    this.pages = [
      { title: 'Clientes', component: "ClientsPage", selected: false},
      { title: 'Productos', component: "ProductsPage", selected: false},
      { title: 'Tienda', component: "TiendaPage", selected: false},
      { title: 'Almacén', component: "AlmacenPage", selected: false},
      { title: 'Trabajadores', component: "TrabajadoresPage", selected: false},
      { title: 'Estadísticas', component: "EstadisticasPage", selected: false},
    ];

  }

  open(index){

    // Quitamos la selección del resto de botones
    this.pages.forEach(element => { 
      element.selected = false;
    });

    // Cambiamos de vista
    console.log("Seleccionamos la vista "+this.pages[index].title);
    this.pages[index].selected = true;
    this.root = this.pages[index].component;
  }

}
