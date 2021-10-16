import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/shared/interfaces/personal.interface';
import { PersonalService } from 'src/app/shared/services/personal.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.css']
})
export class PersonalListComponent implements OnInit {
  personals!: Personal[];
  group: string = '';
  surname: string = '';
  direction: string = '';


  constructor(private personalService: PersonalService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){
    try {
      this.personals = (await this.personalService.getPersonals()) || [];
      this.personals.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
      this.group = '';
      this.surname = '';
      this.direction = '';
    } catch (error) {
      console.log(error);
    }
  }

  LinkToItem(id?: number){
    if(id){
      this.router.navigate([this.router.url, 'item', id])
    }else{
      this.router.navigate([this.router.url, 'item'])
    }
  }
  async filter(){
    this.personals = (await this.personalService.getPersonals()) || [];
    console.log(this.group)
    if (this.group != ''){
     this.personals = this.personals.filter(elem => elem.group.toLocaleLowerCase().includes(this.group.toLocaleLowerCase()));
     this.personals.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
     console.log(this.personals);
    }
    else{

    }
    if (this.surname != ''){
     this.personals = this.personals.filter(elem => elem.surname.toLocaleLowerCase().includes(this.surname.toLocaleLowerCase()));
     this.personals.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
     console.log(this.personals);
    }
    else{

    }
    if (this.direction != ''){
     this.personals = this.personals.filter(elem => elem.direction.toLocaleLowerCase().includes(this.direction.toLocaleLowerCase()));
     this.personals.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
     console.log(this.personals);
    }
    else{

    }
    this.personals.sort((a, b) => { return a.surname < b.surname ? -1 : 1 })
  }
}

