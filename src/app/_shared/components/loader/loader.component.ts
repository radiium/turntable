import { Component, OnInit, Input } from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
  /*,
  animations: [
      trigger('fadeInOut', [
          transition(':enter', [
              style({ opacity: 1 }),
              // animate(150, style({ opacity: 1 }))
          ]),
          transition(':leave', [
              animate(250, style({ opacity: 0 }))
          ])
      ])
  ]
  */
})
export class LoaderComponent implements OnInit {

  @Input() show: boolean;
  @Input() isGlobal: boolean;

  constructor() { }

  ngOnInit() {
  }
}
