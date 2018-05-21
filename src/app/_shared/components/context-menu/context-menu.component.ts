import { Component, OnInit, HostListener,
    ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';


    import { DataService } from 'core/services/data.service';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {

    theme: string;
    body: any;
    overlay: any;
    menu: any;

    @ViewChild('contentContainer') contentContainer: ElementRef;
    @ViewChild('menuContainer') menuContainer: ElementRef;

    constructor(
    private data: DataService,
    private renderer: Renderer2) {
        this.data.appState$.subscribe(data => this.theme = data.theme);
        this.body = document.querySelectorAll('body')[0];
    }

    ngOnInit() {
    }

    showMenu(event) {

        /*
        const btn = this.contentContainer.nativeElement.querySelector('button');
        if (btn) {
            this.renderer.addClass(btn, 'activ');
        }
        */

        this.overlay = this.renderer.createElement('div');
        this.menu = this.menuContainer.nativeElement.children[0]; // .cloneNode(true);

        // Show overlay
        this.renderer.appendChild(this.body, this.overlay);
        this.renderer.setAttribute(this.overlay, 'id', 'customOverlay')
        this.overlay.style.position = 'absolute';
        this.overlay.style.top = '0';
        this.overlay.style.left = '0';
        this.overlay.style.bottom = '0';
        this.overlay.style.right = '0';
        this.overlay.style.zIndex = '100';
        this.overlay.addEventListener('click', this.hideMenu.bind(this));

        // Show menu
        this.renderer.appendChild(this.body, this.menu);
        this.renderer.setAttribute(this.menu, 'id', 'customMenu');
        this.menu.style.position = 'absolute';
        this.menu.style.top  = this.getBoundedPos(window.innerHeight, this.menu.offsetHeight, event.clientY) + 'px';
        this.menu.style.left = this.getBoundedPos(window.innerWidth, this.menu.offsetWidth, event.clientX) + 'px';
        this.menu.style.zIndex = '101';
        this.menu.addEventListener('click', this.hideMenu.bind(this));

        // Set theme
        this.menu.classList.remove('theme-dark');
        this.menu.classList.remove('theme-light');
        if (this.theme === 'dark') {
            this.menu.classList.add('theme-dark');

        } else if (this.theme === 'light') {
            this.menu.classList.add('theme-light');
        }

        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    hideMenu() {
        this.renderer.removeChild(this.body, this.overlay);

        this.menu.style.top  = '';
        this.menu.style.left = '';
        this.menu.style.position = '';
        this.menu.style.zIndex = '';
        this.menu.removeEventListener('click', this.hideMenu.bind(this));
        this.renderer.appendChild(this.menuContainer.nativeElement, this.menu);

        /*
        const btn = this.contentContainer.nativeElement.querySelector('button');
        if (btn) {
            this.renderer.removeClass(btn, 'activ');
        }
        */
    }

    getBoundedPos(screen, box, mouse) {
        return ((mouse + box) > screen) ? (screen - box) : mouse;
    }
}
