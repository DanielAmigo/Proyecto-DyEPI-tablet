import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

/***** Providers *****/
import { BarcodeScanner } from '@ionic-native/barcode-scanner';       // La funcionalidad de Cordova para escanear
import { ClientService } from '../services/client.services';
import { ProductoService } from '../services/producto.services';
import { WorkerService } from '../services/worker.services';
import { SplitPane } from '../services/split-pane.services';

/***** Firebase *****/
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,   // NECESARIO PARA QUE FUNCIONE
    ProductoService,
    ClientService,
    SplitPane,
    WorkerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}