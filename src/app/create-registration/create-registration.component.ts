import { User } from './../models/user.model';
// Ng toast
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

// import  Formgroup
@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent {
  public packages: string[] = ["Monthly", "Quarterly", "Yearly"]
  public genders: string[] = ["Male", "Female"]
  public importantlist: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Learn Muscle",
    "Sugar Craving Body",
    "Fitness"
  ]
  public registerForm!: FormGroup
  public userIdUpdate!: number
  public isUpdateActive: boolean = false
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastService: NgToastService,
    private activatedRouter: ActivatedRoute
  ) { }
  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    })
    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res)
    })
    this.activatedRouter.params.subscribe(val => {
      this.userIdUpdate = val["id"]
      this.api.getRegisterUserId(this.userIdUpdate).subscribe(res => {
        this.isUpdateActive = true
        this.fillFormUpdate(res)
      })
    })
  }
  update() {
    this.api.updateRegisterUser(this.registerForm.value, this.userIdUpdate)
      .subscribe(res => {
        this.toastService.success({ detail: "Success", summary: "Enquiry Added", duration: 3000 });
        this.registerForm.reset()
        this.router.navigate(['list'])
      })
  }
  submit() {
    this.api.postRegisterUser(this.registerForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: "Success", summary: "Enquiry Update", duration: 3000 });
        this.registerForm.reset()

      })

  }
  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.height
    const height = heightValue;
    const bmi = weight / (height * height)
    this.registerForm.controls['bmi'].patchValue(bmi)
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight")
        break
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue("Normal")
        break
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight")
        break
      default:
        this.registerForm.controls['bmiResult'].patchValue("Obese")
        break;
    }
  }
  fillFormUpdate(user: User) {
    this.registerForm.setValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate,
    })
  }
}
