import { Component } from '@angular/core';
import {DistribService} from './service/distrib.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  amount = 0;

  products: any = [
    {id: 1, name: 'iPhone XS', price: 2520},
    {id: 2, name: 'iMac 2018', price: 3652},
    {id: 3, name: 'Casque Beats', price: 1296},
    {id: 4, name: 'iPad 10s', price: 210},
    {id: 5, name: 'Apple TV', price: 845},
    {id: 6, name: 'Mac Mini', price: 1815},
    {id: 7, name: 'iPod', price: 50},
    {id: 8, name: 'Apple Watch', price: 1530},
  ];

  productSelected: number = null;

  showInfo = false;

  firstname = null;
  lastname = null;
  address = null;

  constructor(
      private distribService: DistribService
  ) {

  }

  addPiece(piece) {
    this.amount += piece;
  }

  buy() {
    if (this.productSelected == null) {
      alert('Selectionnez un produit !');
      return;
    }

    const product = this.products.find(pr => pr.id === this.productSelected);

    if (this.amount !== product.price ) {
      alert('Veuillez faire l\'appoint');
      return;
    }

    alert(product.name + ' a été choisi');
    this.showInfo = true;

  }

  submitinfo() {
    if (this.firstname.length < 2) {
      alert('prenom trop court');
    } else if (this.lastname.length < 2) {
      alert('Nom trop court');
    } else if (this.address.length < 10) {
      alert('Addresse trop courte');
    } else {
      this.distribService.buy({
        idProduct: this.productSelected,
        amount: this.amount / 100,
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address
      }).subscribe(
          (res: any) => {
            // cas ok !
            console.log(res);
          },
          (err: any) => {
            // cas pas ok
            console.error(err);
          }
      );
    }
  }

}
