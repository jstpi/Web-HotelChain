import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  isAdmin: boolean;

  constructor(private authService: AuthService){
    this.isAdmin = false;
  }

  ngOnInit() {
    console.log("yo");
    this.isAdmin = this.authService.getTokenRole() == "Admin";
    console.log(this.isAdmin);
  }
}
