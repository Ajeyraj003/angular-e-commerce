import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  constructor(private router:Router,private formBuilder: FormBuilder)
   { 
    this.form = this.formBuilder.group
    ({
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required,Validators.maxLength(8),Validators.minLength(3),]),
      emailid: new FormControl('', [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:  ['', [Validators.required]],
      confirmpassword: ['']
    }, { validator: this.checkPasswords });
 
  }
ngOnInit(): void {
    
}

  get name(): any {
    return this.form.get('name');
  }

  get lastname(): any {
    return this.form.get('lastname');
  }

  get emailid(): any {
    return this.form.get('emailid');
  }

  get password(): any {
    return this.form.get('password');
  }

  get confirmpassword(): any {
    return this.form.get('confirmpassword');
  }

  checkPasswords(group: FormGroup) 
  { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmpassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }
   
  onSubmit(): void {
   
    if (this.form.invalid) 
    {
      for (const control of Object.keys(this.form.controls)) 
      {
        this.form.controls[control].markAsTouched();
      }
      return;
    }
   
       
  }
    
}
