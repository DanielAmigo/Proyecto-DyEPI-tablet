import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import { Worker } from "../models/worker.model";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from 'firebase/app';
import { ProductoCarrito } from "../models/productoCarrito.model";


@Injectable()
export class WorkerService {

    private dbPath = '/Workers/';
    clientsRef: AngularFireList<Worker>;
    user: User;
    myself: Worker;
    carritoRef: AngularFireList<ProductoCarrito>;


    constructor(
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth
    ) {
        afAuth.authState.subscribe((user: User) => {        // Si tenemos sesión iniciada
            this.user = user;
        });
        this.clientsRef = this.db.list(this.dbPath);        // La ruta de los clientes
    }

    get authenticated(): boolean {  // Nos permite saber si está o no autenticado el usuario.
        this.afAuth.authState.subscribe((user: User) => {       // Comprobamos si tenemos sesión iniciada
            this.user = user;
        });
        if(this.user == null){                                  // Devolvemos el resultado, sí o no
            // console.log("authenticated. No estamos logueados");
            return false;
        }
        else{
            // console.log("authenticated. Sí estamos logueados");
            return true;
        }
    }

    /*** LOGIN ***/
    signInWithEmailAndPassword(user: string, pass: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(user, pass);
    }

    /*** REGISTER ***/
    createUserWithEmailAndPassword(user: string, pass: string): Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(user, pass);
    }

    /*** LOGOUT ***/
    signOut(): Promise<any> {
        console.log("Cerrando sesión...");
        return this.afAuth.auth.signOut();
    }


    getMyself(): Worker {
        console.log("getMyself en workerService");

        if (this.authenticated) {
            this.db.list(this.dbPath).snapshotChanges().subscribe(item => {
                console.log(item);
                item.forEach(element => {
                    let x = element.payload.toJSON();
                    console.log(x);
                    x["key"] = element.key;
                    if (x["key"] === this.user.uid) {     // Si ha encontrado el cliente, lo devuelve.
                        console.log("Encontrado el worker, devolviendolo");
                        console.log(x as Worker);
                        this.myself = x as Worker;
                        return x as Worker;
                    }
                });
            });
        }
        return null;                // Si no ha encontrado el cliente, null.
    }


    /***************************** LOGIN ****************************/
    registerButton(value: Worker): void {                // Cuando el cliente pulsa en la pantalla de Login el botón registrar
        this.afAuth.authState.subscribe(auth => {       // si hemos iniciado sesión, metemos el uid como key y su correo dentro.
            this.db.object(this.dbPath+auth.uid+"/").set({
                email: value.email,
                key: auth.uid
            });
        });
    }
}