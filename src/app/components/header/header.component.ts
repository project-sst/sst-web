import { Component, OnInit } from '@angular/core';
import { MENU } from '../../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public isShown:boolean;
	public menu:any;

  constructor() { 
  	this.isShown = false;
  	this.menu = MENU;
  }

  ngOnInit() {
  }

}
