import { Component, OnInit  } from "@angular/core";
import { Router , ActivatedRoute } from '@angular/router';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';
import { NumberToWordsPipe } from '../../commonfunctions/number-to-words.pipe'; 

@Component({
    selector:'ViewEL',
    templateUrl:'ViewEngagementLetter.component.html',
})

export class ViewEngagementLetter implements OnInit {
    assignmentList: any[] = []; 
    companyName: string = '';
    Address: string = '';
    Contact: string = '';
    Email: string = '';
    autoid: string | null = null;
    clientid: string | null = null;
    SignatoryName: string = '';
    ClientConcernpersonName: string = '';
    ClientName: string = '';
    ClientAddress: string = '';
    ELID: string = '';
    ELDate: string = '';
    totalProfessionalFee: number = 0.0;
    totalVatAmount: number = 0.0;
    totalNetAmount: number = 0.0;
    hasScopeOfWork: boolean = false;
    constructor(private route: ActivatedRoute,private router: Router,private dropDownService: DropDownServiceService) { }

    ngOnInit(): void {
      this.autoid = this.route.snapshot.paramMap.get('autoid');
      this.clientid = this.route.snapshot.paramMap.get('clientid');
      if (this.autoid && this.clientid) {
        this.loadData(this.autoid, this.clientid);
      }
       

      }

      loadData(autoid: string, clientid: string): void {
        this.loadCompanyDetails();
        this.loadClientdetails(clientid);
        this.loadELDetails(autoid);
        this.loadAssignmentDetails(autoid);
      }
      
      loadCompanyDetails(): void {
        this.dropDownService.getCompanyDetails().subscribe(data => {
          if (data && data.length > 0) {
            const company = data[0];
            this.companyName = data[0].CompanyName;
            this.Address = `${company.UniteNo},
                        Floor: ${company.Floor},
                        Tower: ${company.Tower},
                        Area: ${company.Area},
                        Emirates: ${company.Emirates},
                        Country: ${company.Country}`;
            this.Email =  data[0].Email;
            this.Contact = data[0].ContactNo;
          }
        });
      }

      
      loadClientdetails(clientid: string): void {
        this.dropDownService.getClientDetails(clientid)
          .subscribe(data => {
            if (data && data.length > 0) {
              const clientData = data[0];
              this.SignatoryName = data[0].SignatoryName;
              this.ClientName = data[0].CompanyName;
              this.ClientConcernpersonName = data[0].ConcernpersonName;
              this.ClientAddress = `${clientData.AddUnitNo},
              Floor: ${clientData.AddFloor},
              Tower: ${clientData.AddTower},
              Area: ${clientData.AddArea},
              Emirates: ${clientData.AddEmirates},
              Country: ${clientData.AddCountry}`;
            }
          });
      }

      loadELDetails(autoid: string): void {
        this.dropDownService.getELDetails(autoid)
          .subscribe(data => {
            if (data && data.length > 0) {
              const ELData = data[0];
              this.ELID = data[0].ELID;
              this.ELDate = data[0].ELDate;
              this.totalProfessionalFee = data[0].ProfessionalFee;
              this.totalVatAmount = data[0].VatAmount;
              this.totalNetAmount = data[0].AmountIncVat;
            }
          });
      }

      loadAssignmentDetails(autoid: string): void {
        this.dropDownService.getAssignmentDetails(autoid).subscribe({
          next: data => {
            if (data && data.length > 0) {
              this.assignmentList = data; 
              //this.hasScopeOfWork = data.some(scope => scope.ScopeOfWork && scope.ScopeOfWork.trim() !== '');
            }
          },
          error: err => console.error('Error fetching assignment details:', err)
        });
      }
      printDiv(divId: string) {
        const printContents = document.getElementById(divId)?.innerHTML;
        const originalContents = document.body.innerHTML;
    
        if (printContents) {
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        } else {
            console.error('Div not found');
        }
    }
   
}

