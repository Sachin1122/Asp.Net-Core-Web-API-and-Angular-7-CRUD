import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/Shared/payment-detail.service';
import { PaymentDetail } from 'src/app/Shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles:[]
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service: PaymentDetailService,  private toastr : ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd:PaymentDetail){
    this.service.formData = Object.assign({},pd);
  }

  onDelete(PmId){
    if(confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(PmId)
      .subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted Successfully','Payment Detail Register');
      },
        err => {
          console.log(err);
        })
    }
  }

}
