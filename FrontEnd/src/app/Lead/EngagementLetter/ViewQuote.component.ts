import { Component, OnInit, ViewChild, ElementRef   } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router , ActivatedRoute } from '@angular/router';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';
import { NumberToWordsPipe } from '../../commonfunctions/number-to-words.pipe'; 
import { MatDialog } from '@angular/material/dialog';
import { SignaturePopupComponent } from '../../signature-popup/signature-popup.component';
import { AuthService } from '../../Services/auth.service';

declare var $: any; // Declare jQuery
@Component({
    selector:'ViewQuote',
    templateUrl:'ViewQuote.component.html',
})

export class ViewQuote implements OnInit {
    assignmentList: any[] = []; 
    companyName: string = '';
    Address: string = '';
    Contact: string = '';
    Email: string = '';
    ClientEmail :  string = '';
    ClientContact :  string = '';
    autoid: string | null = null;
    clientid: string | null = null;

    Signautoid: string ='';
    Signclientid: string ='';

    SignatoryName: string = '';
    QUOTFirstPartySign: string = '';
    QUOTSecondPartySign: string = '';
    ClientConcernpersonName: string = '';
    ClientName: string = '';
    ClientAddress: string = '';
    ELID: string = '';
    ELDate: string = '';
    totalProfessionalFee: number = 0.0;
    totalVatAmount: number = 0.0;
    totalNetAmount: number = 0.0;
    hasScopeOfWork: boolean = false;
    SalesPersonName: string = '';
    SalesPersonMob: string = '';
    SalesPersonEmail: string = '';
    SalesPersonDesignation: string = '';

    @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;
    constructor(private route: ActivatedRoute,private router: Router,private dropDownService: DropDownServiceService,private http: HttpClient,private DataServices: DataServices, private authService: AuthService) { }

    ngOnInit(): void {
      this.autoid = this.route.snapshot.paramMap.get('autoid');
      this.clientid = this.route.snapshot.paramMap.get('clientid');
      this.Signautoid = this.autoid ?? '';
      this.Signclientid = this.clientid ?? '';
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
              this.ClientEmail = data[0].ConcernpersonEmail;
              this.ClientContact = data[0].ConcernpersonContactNo;
              this.SalesPersonName = data[0].SalesPersonName;
              this.SalesPersonEmail = data[0].SalesPersonEmail;
              this.SalesPersonMob = data[0].SalesPersonMob;
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
              debugger
              const ELData = data[0];
              this.ELID = data[0].ELID;
              this.ELDate = data[0].ELDate;
              this.totalProfessionalFee = data[0].ProfessionalFee;
              this.totalVatAmount = data[0].VatAmount;
              this.totalNetAmount = data[0].AmountIncVat;
              this.QUOTFirstPartySign =  data[0].QUOTFirstPartySign;
            }
          });
      }

      loadAssignmentDetails(autoid: string): void {
        this.dropDownService.getAssignmentDetails(autoid).subscribe({
          next: data => {
            if (data && data.length > 0) {
              this.assignmentList = data; 
             
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
    openModal(): void {
        $('#signatureModal').modal('show');
      }
      onSignatureSaved(signature: string) {
        debugger
        this.saveSignature(signature);
      }


      saveSignature(signature: string) {
        debugger
        const signatureData = {
          File: signature,
          autoid: this.Signautoid,
          clientid: this.Signclientid,
          FileMode : 'Signature',
          Opcode : '1',
          FileFolder : 'signatures',
          SubmittedBy: String(this.authService.currentUserId),
        };
    
        this.DataServices.saveSignature(signatureData).subscribe({
          next: (response) => {
            ShowDone('Signature added successfully');
            this.closeModal();
            this.refreshData();
            
            
          },
          error: (err) => {
            console.error('Error saving signature:', err);
          },
          complete: () => {
          }
        });
      }

      refreshData() {
        debugger
        const currentUrl = this.router.url;
        this.router.navigateByUrl(currentUrl); // Refresh page
      }

      closeModal() {
        debugger
        if (this.closeButton && this.closeButton.nativeElement) {
          this.closeButton.nativeElement.click();
        }
      }
     
}

