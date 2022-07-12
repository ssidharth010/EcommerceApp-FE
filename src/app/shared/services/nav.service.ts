import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'home', type: 'link', active: true, path: '/home'
		},
		{
			title: 'Products', type: 'link', active: true, path: '/product/list'
		},
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'home', type: 'link', active: true, path: '/home'
		},
		{
			title: 'Products', type: 'link', active: true, path: '/product/list'
		}
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
