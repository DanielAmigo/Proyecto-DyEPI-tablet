import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WorkerService } from '../services/worker.services';
import { SplitPane } from '../services/split-pane.services';
import { Worker } from '../models/worker.model';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = 'LoginPage';
  pages: Array<{ title: string, component: string, selected: boolean }>;
  className: string = "";
  myself: Worker;
  email: string = "marta.ruiz@primark.com";

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public workerService: WorkerService,
    public splitPane: SplitPane,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pages = [
        { title: 'Clientes', component: "ClientsPage", selected: false },
        { title: 'Productos', component: "ProductsPage", selected: false },
        { title: 'Tienda', component: "TiendaPage", selected: false },
        { title: 'Almacén', component: "AlmacenPage", selected: false },
        { title: 'Trabajadores', component: "TrabajadoresPage", selected: false },
        { title: 'Estadísticas', component: "EstadisticasPage", selected: false },
      ];
      this.pages[0].selected = true;
    });
  }

  /****** Cosas del menú lateral ******/
    /********* Abrir una vista concreta ********/
    open(index) {
      console.log(this.myself);
      // Quitamos la selección del resto de botones
      this.pages.forEach(element => {
        element.selected = false;
      });
  
      // Cambiamos de vista
      console.log("Seleccionamos la vista " + this.pages[index].title);
      this.pages[index].selected = true;
      this.rootPage = this.pages[index].component;
    }
  
    /********* Botones del menú lateral ********/
    logout() {
      this.workerService.signOut();
      this.nav.setRoot("LoginPage");
    }

    actualizarValores(){
      console.log("HE IONCHANGEADOOO");
      this.myself = this.workerService.getMyself();
      // this.email = this.myself.email;
    }



}