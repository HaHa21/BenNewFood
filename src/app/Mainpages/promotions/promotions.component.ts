import { Component, Input } from '@angular/core';
import { PostInterface } from '../post/postinterface';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})

export class PromotionComponent implements PostInterface {

   @Input() post : any;

}
