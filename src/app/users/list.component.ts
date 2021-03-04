import { Component, OnInit } from '@angular/core';
import { first, timeInterval } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users: User[]=[];
   
    selectedIDs:any[]=[];
    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        if (!user) return;
        user.isDeleting = true;
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }

    refreshTable(){
       this.ngOnInit();
     
    }

    searchTable(){
        var input, filter, found, table, tr, td, i, j;
        input = document.getElementById("search");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            for (j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                tr[i].style.display = "";
                found = false;
            } else if (tr[i].id != 'tableHeader')
            {
                tr[i].style.display = "none";
            }
        }
    }

    selectID(id, event:any){
        this.selectedIDs.push(id);
    }

    deleteTable(event:any){
        this.selectedIDs.forEach(id=>{
        this.users.splice(this.users.findIndex(e => e.id === id),1);
    })
    this.selectedIDs = [];
}}