import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { Customer } from 'src/app/objects/customer.vm';
import { Address } from 'src/app/objects/address.vm';
import { Employee } from 'src/app/objects/employee.vm';
import { AuthService } from 'src/app/services/auth.service';
import { ManageInfoService } from 'src/app/services/manage-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelEmployeeService } from 'src/app/services/hotel-employees.service';
import { AddEmployeeModal } from 'src/app/components/add-employee_modal/add-employee.modal';
import { DeleteEmployeeService } from 'src/app/services/delete-employee.service';

@Component({
  selector: 'app-hotel-employee',
  templateUrl: './hotel-employee.page.html',
  styleUrls: ['./hotel-employee.page.scss'],
})
export class HotelEmployeePage implements OnInit {
  errorString: string;
  chain_name: string;
  hotel_id: string;
  employees: Employee[];
  sortedEmployees: Employee[];

  constructor(
    private authService: AuthService,
    private manageInfoService: ManageInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private hotelEmployeeService: HotelEmployeeService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private deleteEmployeeService: DeleteEmployeeService) {
      this.chain_name = "";
      this.hotel_id = "";
      this.errorString = "";
      this.employees = [];
      this.sortedEmployees = [];
  }

  ngOnInit() {
    this.errorString = "";
    this.employees = [];
    if (this.authService.isLoggedIn() && (this.authService.getTokenRole() == "Admin" || this.authService.getTokenRole() == "Employee")){

      this.chain_name = this.manageInfoService.chain_name;
      if (this.manageInfoService.chain_name == ""){
        this.chain_name = this.route.snapshot.params['chain_name'];
      }
      this.hotel_id = this.manageInfoService.hotel_id;
      if (this.manageInfoService.hotel_id == ""){
        this.hotel_id = this.route.snapshot.params['hotel_id'];
      }
      if (this.chain_name == null){
        this.router.navigateByUrl("");
      }
      else {
        this.getAllEmployees();
      }
    }
    else {
      this.router.navigateByUrl("");
    }
  }

  onFilterEmployees(search){
    this.sortedEmployees = this.filterEmployees(search.detail.value);
  }

  private getAllEmployees(){
    this.errorString = "";
    this.employees = [];
    let hotelInfo={
      hotel_id: this.manageInfoService.hotel_id
    }
    if (this.manageInfoService.hotel_id == ""){
      hotelInfo={
        hotel_id: this.route.snapshot.params['hotel_id']
      }
    }

    this.hotelEmployeeService.getEmployees(JSON.stringify(hotelInfo)).subscribe(employees => {
      console.log(employees);
      if (employees != null){
        employees.forEach(employee => {
          this.employees.push(new Employee(employee.sin, employee.email, employee.full_name, new Address(employee.address), []));
        }); 
        this.sortedEmployees  = Object.assign([], this.employees);
      }
      else {
        this.errorString = "No employees was founded";
      }
    }, err => {
      this.errorString = err;
    });
  }

  async onAddEmployee(){
    let modal = await this.modalCtrl.create({
      component: AddEmployeeModal,
      componentProps: {
        chain_name: this.chain_name,
        hotel_id: this.hotel_id
      }
    });
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "submit"){
          this.getAllEmployees();
        }
      }
    });
  }

  async onRemoveEmployeeConfirm(i: number) {
    const alert = await this.alertController.create({
      header: 'Delete: '+this.sortedEmployees[i].full_name,
      message: 'Are you sure you want to delete this employee?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('CANCEL');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.onDeleteEmployee(i);
          }
        }
      ]
    });

    await alert.present();
  }

  private onDeleteEmployee(i: number){
    let employeeObj = {
      hotel_id: this.hotel_id,
      sin: this.sortedEmployees[i].sin
    }
    this.deleteEmployeeService.deleteEmployee(JSON.stringify(employeeObj)).subscribe(deleteResponse => {
      console.log(deleteResponse);
      if (deleteResponse != null){
        this.deleteEmployeeToast(i);
        this.getAllEmployees();
      }
      else {
        this.errorString = "Error occured during deletion"
      }
    }, err => {
      this.errorString = err;
    });
  }

  private filterEmployees(full_name: string): Employee[] {
    return this.employees.filter(employee => {
      return employee.full_name.toString().indexOf(full_name) > -1;
    });
  }

  private async deleteEmployeeToast(i: number) {
    const toast = await this.toastController.create({
      message: 'Employee: '+this.sortedEmployees[i].full_name+' deleted.',
      duration: 2000
    });
    return toast.present();
  }

}
