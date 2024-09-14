import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';
import { AuthService } from '../../Services/auth.service';

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
      constructor(private fb: FormBuilder,private dropDownService: DropDownServiceService, private authService: AuthService ,private DataServices: DataServices, private router: Router,private route: ActivatedRoute) { }
    
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
          // const leadData = this.leadForm.value;
          // leadData.SubmittedBy = "1";
          // leadData.Opcode = "1";
          const leadData = {
            ...this.leadForm.value,
            Opcode: this.isEditMode ? '4' : '1',
            SubmittedBy : this.authService.currentUserId,
            Autoid: this.isEditMode ? this.LeadId : undefined
          };
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
            Autoid: leadData.Autoid || null
        };
          
    
          this.DataServices.submitLead(transformedLeadData).subscribe({
           
            next: response => {
              // console.log('Lead submitted successfully', response);
              // ShowDone('Lead submitted successfully');
              console.log(`${this.isEditMode ? 'Lead updated' : 'Lead added'} successfully`, response);
              ShowDone(`${this.isEditMode ? 'Lead updated' : 'Lead added'} successfully`);
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
  this.DataServices.getLeadById(LeadId).subscribe({
    next: response => {
     
      if (response && response.length > 0) {
        const LeadData = response[0]; 
        const selectedSalesPerson = this.salesPersons.find(
          sp => sp.ID === LeadData.SalesPerson
        );
        const selectedAuthority = this.authorities.find(
          sp => sp.ID === LeadData.Authority
        );
        const selectedSource = this.sources.find(
          sp => sp.ID === LeadData.Source
        );
       
        const selectedEmirates = this.emirates.find(
          sp => sp.ID === LeadData.Emirates
        );
        const selectedCountry = this.countries.find(
          sp => sp.ID === LeadData.Country
        );
        const selectedArea = this.areas.find(
          sp => sp.ID === LeadData.Area
        );
       
        this.leadForm.patchValue({
          SalesPerson: selectedSalesPerson || null,
          Authority : selectedAuthority|| null,
          Source : selectedSource|| null,
          CompanyName: LeadData.CompanyName || '',
          Landline:LeadData.Landline || '',
          ContactPerson :LeadData.ContactPerson || '',
          Designation :LeadData.Designation || '',
          MobileNumber  :LeadData.MobileNumber || '',
          EmailId  :LeadData.EmailId || '',
          Address  :LeadData.Address || '',
          Emirates : selectedEmirates || null,
          Country  : selectedCountry || null,
          Area  : selectedArea || null,

        });
      } else {
        console.error('No data found for the given LeadId');
      }
    },
    error: error => {
      console.error('Error loading Lead data', error);
    }
  });
}

navigateToLeadList(): void {
  const confirmation = window.confirm('Are you sure you want to go back to Home Page?');
  if (confirmation) {
    this.router.navigate(['/LeadList']);
  }
}

}
