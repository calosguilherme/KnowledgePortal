import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/_services/index.service';
import { SharedService } from 'app/_services/shared.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;
declare var FB: any;
declare const gapi: any;

@Component({
    selector: 'app-forgot-cmp',
    templateUrl: './forgot.component.html'
})

export class ForgotComponent implements OnInit {
    email: string
    toggleButton: any;
    @BlockUI() blockUI: NgBlockUI;

    constructor(private element: ElementRef,
        private authService: AuthService,
        private router: Router,
        private sharedService: SharedService
    ) {
        
    }


    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }

    recuperarSenha() {
        this.blockUI.start('Carregando');
        this.authService.forgotPassword(this.email).subscribe(
            success => {
                this.blockUI.stop();
                this.sharedService.nofiticacao(success.message, 'success')
                this.router.navigate(['../../pages/login'])
            },
            error => {
                console.log(error)
                this.sharedService.nofiticacao(error.error.userMessage, 'danger')
          })
    }
}
