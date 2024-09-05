import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropDownServiceService } from '../../drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';

@Component({
    selector:'lead',
    templateUrl: 'Leadadd.component.html',
    
})
export class LeadAddComponent implements OnInit {
    selectedContactPerson?: number;
    leadForm: FormGroup = new FormGroup({});
    
      authorities: { ID: number; Name: string }[] = [];
      salesPersons:{ ID: number; Name: string }[] = [];
      sources:{ ID: number; Name: string }[] = [];
      areas:{ ID: number; Name: string }[] = [];
      countries:{ ID: number; Name: string }[] = [];
      emirates:{ ID: number; Name: string }[] = [];
      isEditMode: boolean = false;
      LeadId?: number; 
      constructor(private fb: FormBuilder,private dropDownService: DropDownServiceService ,private DataServices: DataServices, private router: Router,private route: ActivatedRoute) { }
    
      ngOnInit(): void {
        this.leadForm = this.fb.group({
          SalesPerson: [''],
          Authority: [''],
          Source: [''],
          CompanyName: [''],
          Landline: [''],
          ContactPerson: [''],
          Designation: [''],
          MobileNumber: [''],
          EmailId: [''],
          Address: [''],
          Area: [''],
          Country: [''],
          Emirates: ['']
        });
        this.dropDownService.getAuthorities(data => {
            this.authorities = data;
          });

          this.dropDownService.getsalespersons(data => {
            this.salesPersons = data;
          });

          this.dropDownService.getSource(data => {
            this.sources = data;
          });
          this.dropDownService.getArea(data => {
            this.areas = data;
          });
          this.dropDownService.getCountry(data => {
            this.countries = data;
          });

          this.dropDownService.getEmirates(data => {
            this.emirates = data;
          });

          this.route.queryParams.subscribe(params => {
            if (params['LeadId']) {
              this.LeadId = +params['LeadId'];
              this.isEditMode = true;
              
              this.loadleadData(this.LeadId);
            }
          });
      }
      onSubmit() {
        if (this.leadForm.valid) {
         debugger
          const leadData = this.leadForm.value;
          leadData.SubmittedBy = "1";
          leadData.Opcode = "1";
          
          const transformedLeadData = {
            SalesPerson: leadData.SalesPerson?.ID || '',
            Authority: leadData.Authority?.ID || '',
            Source: leadData.Source?.ID || '',
            CompanyName: leadData.CompanyName || '',
            Landline: leadData.Landline || '',
            ContactPerson: leadData.ContactPerson || '',
            Designation: leadData.Designation || '',
            MobileNumber: leadData.MobileNumber || '',
            EmailId: leadData.EmailId || '',
            Address: leadData.Address || '',
            Area: leadData.Area?.ID || '',
            Country: leadData.Country?.ID || '',
            Emirates: leadData.Emirates?.ID || '',
            SubmittedBy: leadData.SubmittedBy || '',
            Opcode: leadData.Opcode || '',
            CreatedOn: leadData.CreatedOn || '',
            Autoid: leadData.CreatedOn || null
        };
          
    
          this.DataServices.submitLead(transformedLeadData).subscribe({
           
            next: response => {
              console.log('Lead submitted successfully', response);
              ShowDone('Lead submitted successfully');
              this.leadForm.reset();
              this.router.navigate(['/LeadList']);
          },
          error: error => {
              console.error('Error submitting lead', error);
             
          }
          });
        
      }
}

loadleadData(LeadId: number): void {
  this.DataServices.getServiceById(LeadId).subscribe({
    next: response => {
      // Assuming response is an array and you need to access the first element
      if (response && response.length > 0) {
        const assignmentData = response[0]; // Accessing the first element of the array

        this.leadForm.patchValue({
          AssignmentName: assignmentData.AssignmentName || '',
          ETC: assignmentData.ETC || '',
          ScopeOfWork: assignmentData.ScopeOfWork || '',
          Objectives:assignmentData.Objectives || '',
          frespons:assignmentData.FirstPartyResponsibility || '',
        });
      } else {
        console.error('No data found for the given AssignmentId');
      }
    },
    error: error => {
      console.error('Error loading assignment data', error);
    }
  });
}

navigateToLeadList(): void {
  const confirmation = window.confirm('Are you sure you want to cancel?');
  if (confirmation) {
    this.router.navigate(['/LeadList']);
  }
}

}
