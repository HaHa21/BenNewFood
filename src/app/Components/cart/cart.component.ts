import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  btnDisabled = false;
  handler: any;

  quantities = [];

  constructor(private router : Router, private cart: CartService, private data : DataService) { }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.data.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data, index) => {
      total += data['price'] * this.quantities[index];
    });
    return total;
  }

  removeProduct(index, product) {
    this.quantities.splice(index, 1);
    this.data.removeFromCart(product);
  }

  ngOnInit() {
    this.cartItems.forEach(data => {
    this.quantities.push(1);
  });
  this.handler = StripeCheckout.configure({
    key: environment.stripeKey,
    image: 'assets/img/logo.png',
    locale: 'auto',
    token: async stripeToken => {
      let products;
      products = [];
      this.cartItems.forEach((d, index) => {
        products.push({
          product: d['_id'],
          quantity: this.quantities[index],
        });
      });

      try {
        const data = await this.cart.payments(  'http://localhost:3030/api/payment',
            {
              totalPrice: this.cartTotal,
              products,
              stripeToken,
            });
        data['success']
          ? (this.data.clearCart(), this.data.success('Purchase Successful.'))
          : this.data.error(data['message']);
      } catch (error) {
        this.data.error(error['message']);
      }
    },
  });
  }


}
