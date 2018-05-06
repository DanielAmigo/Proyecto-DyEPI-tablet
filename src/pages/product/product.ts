import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { Producto } from "../../models/producto.model";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  @ViewChild(Slides) slides: Slides;

  public producto: Producto;
  public talla: string;
  public referenciaProd: string;
  public tallaSelected: string;
  public tallas: Array<string>;
  public cantidadAlmacen: Array<number>;
  public cantidadTienda: Array<number>;
  public colores: Array<string>;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public cantidad: number = 1;

  /********************************* Constructor ****************************/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,

  ) {
    console.log("Constructor de: producto.ts");
    if (navParams.get('producto') != undefined) this.referenciaProd = navParams.get('producto');

    console.log("Buscando: " + this.referenciaProd);

    // Inicializamos los arrays
    this.tallas = [];
    this.cantidadAlmacen = [];
    this.cantidadTienda = [];
    this.colores = [];

    // Recibimos los productos y buscamos el nuestro
    this.productoService.getProducts()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          if (x["referencia"] === this.referenciaProd) {    // Encontrado el producto.
            this.producto = x as Producto;
            console.log("Producto encontrado.");
            console.log(this.producto);

            // Preparamos la información en arrays
            Object.keys(x["talla"]).forEach(key => {  
              let value = x["talla"][key];
              this.tallas.push(value);
            });
            Object.keys(x["tallaCantidadAlmacen"]).forEach(key => {
              let value2 = x["tallaCantidadAlmacen"][key];
              this.cantidadAlmacen.push(value2);
            });
            Object.keys(x["tallaCantidadTienda"]).forEach(key => {
              let value3 = x["tallaCantidadTienda"][key];
              this.cantidadTienda.push(value3);
            });

            // Inicializamos los botones del gestor de tallas
            this.showLeftButton = false;
            this.showRightButton = this.tallas.length > 2;

            Object.keys(x["colores"]).forEach(key => {    // Guardamos los colores bien
              let value3 = x["colores"][key];
              this.colores.push(value3);
            });
            this.producto.colores = this.colores;


            console.log("Objeto conseguido y arrays creados");   // Necesario para que termine antes de que pase a lo siguiente
          }
        });
      });
  }

  public slideNext(): void {
    this.slides.slideNext();
  }
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
  }
}
