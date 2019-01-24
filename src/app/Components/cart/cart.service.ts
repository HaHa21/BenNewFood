import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private router : Router) { }

  payments(url: string, totalPrice: number, products: string[], stripeToken: string) {
      return this.http.post(url,
            {
              totalPrice,
              products,
              stripeToken
            });
  }
}
