import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personal } from 'src/app/shared/interfaces/personal.interface';
import { PersonalService } from 'src/app/shared/services/personal.service';

@Component({
  selector: 'app-personal-item',
  templateUrl: './personal-item.component.html',
  styleUrls: ['./personal-item.component.css']
})
export class PersonalItemComponent implements OnInit {
  id: number | null= null;
  personal!: Personal;
  personalForm!: FormGroup;

  constructor(private personalService: PersonalService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id? +params.id:null;
    })
    this.getData();
  }

  async getData(){
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      surname: [null, [Validators.required, Validators.maxLength(100)]],
      patronymic: [null, Validators.maxLength(100)],
      phone: [null, [Validators.required, Validators.maxLength(100)]],
      mail: [null, [Validators.required, Validators.maxLength(100)]],
      birthday: [null, [Validators.required,Validators.maxLength(100)]],
      group: [null, [Validators.required, Validators.maxLength(100)]],
      direction: [null, [Validators.required, Validators.maxLength(100)]]
    };

    this.personalForm = this.fb.group(controls);

    if(this.id){
      try {
        this.personal = await this.personalService.getPersonal(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.personalForm.patchValue(this.personal)
    }else{
      this.personalForm.reset();
    }
  }

  async save(){
    if(this.id){
      const personal = this.personalForm.value;
      try {
        await this.personalService.putPersonal(this.id, personal);
        this.getData();
      }catch (error){
        console.log(error);
      }
    }else{
    const personal = this.personalForm.value;
    try {
      const result = await this.personalService.postPersonal(personal);
      this.router.navigateByUrl('personal');
    }catch (error){
      console.log(error);
    }
    }
  }
  async delete(){
    try {
      await this.personalService.deletePersonal(this.id!);
      this.router.navigate(['personal']);
    } catch (error) {
      console.log(error);
    }
  }
}

