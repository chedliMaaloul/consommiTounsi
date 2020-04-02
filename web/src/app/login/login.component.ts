import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var toastr: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy {
    form: FormGroup;
   nom: string;
   password: string;
   checked:boolean=false;
  constructor(private  router: Router, private fb: FormBuilder, ) {

    this.form = fb.group({
      nom: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  ngOnInit() {
    if(localStorage.getItem('remember')=='true')
      this.router.navigate(['dashboard']);


    $('body').addClass('empty-layout');
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'positionClass': 'toast-top-right',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '2000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    };
  }
  get form_control() {

    return this.form.controls;
  }

   onSubmit() {
    if (this.form.valid) {
      if(this.form.get('nom').value=='admin' && this.form.get('password').value=='admin')
      {
        if(this.checked)
          localStorage.setItem('remember','true');

        this.router.navigate(['dashboard']);
      }

      else
        toastr['error']('Usename ou Password incorrecte');

    } else {
      toastr['error']('veuillez  remplire les champs');

    }


  }



  remember()
  {
    this.checked=true;

  }
  ngOnDestroy() {
    $('body').removeClass('empty-layout');
  }

}
