import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import { Producto } from "../models/producto.model";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ProductoService {

    totalCost: number;
    private dbPath = '/Products/';
 
    productsRef: AngularFireList<Producto>;

    constructor(private db : AngularFireDatabase){
        console.log("constructor producto.services");
        this.productsRef = db.list(this.dbPath);
    }
  
    getProducts(){      // Método para obtener la snapshot de productos, luego hay que sacarlos manualmente. EJ: Catalogo
        return this.productsRef = this.db.list(this.dbPath);
    }

}