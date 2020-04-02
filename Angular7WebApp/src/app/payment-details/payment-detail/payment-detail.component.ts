import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/Shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles:[]
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service:PaymentDetailService , private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
     this.service.formData = {
      PmId:0,
      CardOwnerName:'',
      CardNumber:'',
      ExpDate:'',
      CVV:''
     }
   }

   onSubmit(form:NgForm)
   {
     if(this.service.formData.PmId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    
   }

   insertRecord(form:NgForm)
   {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted successfully','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
   }

   updateRecord(form:NgForm)
   {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Updated successfully','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
   }
}

