import { Component, Input } from '@angular/core';
import { PostInterface } from '../post/postinterface';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})

export class HealthComponent implements PostInterface {

  @Input() post : any;

}
