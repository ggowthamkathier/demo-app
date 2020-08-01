import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  ipAddress: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.getIP()
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      ipAddress: ['']
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.ipAddress)
    this.submitted = true;
    this.loading = true;
    this.registerForm.controls['ipAddress'].setValue(this.ipAddress);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //call
   console.log(this.registerForm.getRawValue())
   this.router.navigate(['/login']);
      
}
getIP()  
  {  
    this.data.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  }  

}
