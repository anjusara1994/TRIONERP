import { HttpClient } from "@angular/common/http";
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownServiceService } from '../../drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';

declare var $: any;

@Component({
    selector:'CreateEL',
    templateUrl: 'CreateEL.component.html',
    
})
export class CreateELComponent implements OnInit, AfterViewInit {
    @ViewChild('dataTable', { static: false }) table!: ElementRef;
    @ViewChild('dataTableEL', { static: false }) tableEL!: ElementRef;
    
    ELForm: FormGroup = new FormGroup({});
    clients: { ID: number; Name: string }[] = [];
    Assignments: { ID: number; Name: string }[] = [];
    periodtypes: { ID: number; Name: string }[] = [];
    searchQuery: string = '';
    isLoading: boolean = false;
    pageSize: number = 10;
    page: number = 1;
    tableData: any[] = []; 
    queryParams: any[] = [];
    dtOptions: any = {}; 

    constructor(private fb: FormBuilder, private router: Router,private dropDownService: DropDownServiceService,private DataServices: DataServices) { }

    ngOnInit(): void {
     
        this.ELForm = this.fb.group({
            Client: [''],
            CompanyName:[''],
            TRNNo :[''],
            LicenseNo:[''],
            SignatoryName:[''],
            SignatoryDesignation:[''],
            ConcernpersonName:[''],
            ConcernpersonDesignation:[''],
            ConcernpersonContactNo:[''],
            ConcernpersonEmail:[''],
            SignatoryContactNo:[''],
            SignatoryEmail:[''],
            Assignment:[''],
            EndDate:[''],
            StartDate:[''],
            PeriodType:[''],
            mode: ['charged'],
            ProfessionalFee: ['0.00'],
            PeriodValue: ['1'],
            TotalAmount: [''],
            DiscountPercent: ['0.00'],
            DiscountAmount: ['0.00'],
            ActualAmount: ['0.00'],
            vatpercent: ['5'],
            vatamnt: ['0.00'],
            Netamnt:['0.00'],
            AuthorityFee: ['0.00'],
            Advancepercent: ['0'],
            AdvanceAmnt: ['0.00'],
          });
          this.queryParams = [
            { param: 'Opcode', value: '2', op: 's' },
            { param: 'ClientID', value: null, op: 'id' }
           
          ];
        this.dropDownService.getPeriodTypes(data => {
        this.periodtypes = data;
        });

        this.loadClients();
        this.loadAssignments();
       
      }

      ngAfterViewInit(): void {
        //this.initializeDataTable();
      }

      initializeDataTable(): void {
      
        if (!this.table || !this.table.nativeElement) {
          console.error('Table element is not available.');
          return;
        }
      
        // Check if DataTable is already initialized
        if ($.fn.DataTable.isDataTable(this.table.nativeElement)) {
          $(this.table.nativeElement).DataTable().clear().destroy();
        }
        $(this.table.nativeElement).DataTable({
          
          serverSide: true,
          processing: true,
          scrollX: true, 
          ajax: (data: any, callback: any, settings: any) => {
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const draw = data.draw;
            const search = data.search.value;
            const sortColumnIndex  = data.order[0].column;
            const sortDirection = data.order[0].dir;
            const sortColumn = data.columns[sortColumnIndex].data;
            this.queryParams = [
              { param: 'Opcode', value: '2', op: 's' },
              { param: 'ClientID', value: this.ELForm.value.Client?.ID || ''},
             
            ];
             debugger
            this.DataServices.getAssignments(page, pageSize, this.queryParams, search, sortColumnIndex, sortDirection).subscribe({
              next: response => {
                callback({
                  draw: draw,
                  recordsTotal: response.recordsFiltered,
                  recordsFiltered: response.recordsTotal,
                  data: response.data
                });
              },
              error: error => console.error('Error fetching lead data', error)
            });
          },
          columns: [
            {
              title: '<input type="checkbox" id="select-all">',
              data: 'Autoid',
              render: (data: any) => {
                return `<input type="checkbox" class="row-checkbox" value="${data}">`;
              },
              orderable: true
            },
            { title: 'SI.No', data: 'RowNum' },
             { title: 'Assignment Name', data: 'AssignmentName' },
            { title: 'Period', data: 'PeriodFrom' },
            { title: 'Type', data: 'Period' },
            { title: 'Mode', data: 'Mode' },
            { title: 'Professional Fee', data: 'ProfessionalFee' },
            { title: 'Period Value', data: 'PeriodValue' },
            { title: 'Gross Amount', data: 'GrossAmount' },
            { title: 'VAT Percent', data: 'VATPercent' },
            { title: 'VAT Amount', data: 'VATAmount' },
            { title: 'Net Amount', data: 'NetAmount' },
            { title: 'Authority Fee', data: 'AuthorityFee' },
            { title: 'Advance Percent', data: 'AdvancePercent' },
            { title: 'Advance Amount', data: 'AdvanceAmount' },
            {
              title: 'CreatedOn',
              data: null,
              render: (data: any, type: any, row: any) => {
                const createdOn = row.CreatedOn ? `On: ${new Date(row.CreatedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'On: N/A';
                const createdBy = row.Createdby || 'Unknown';
                return `${createdOn}<br>By: ${createdBy}`;
              }
            },
            {
              title: 'Delete',
              data: 'Autoid',
              render: (data: any, type: any, row: any) => {
                
                return ` <button type="button" class="btn btn-xs bgRed delete-btn" data-id="${row.Autoid}"><i class="fa fa-trash"></i></button>`;
              }
            }
          ]
        });
        $(this.table.nativeElement).off('click', '.delete-btn');
       
        $(this.table.nativeElement).on('click', '.delete-btn', (event: JQuery.TriggeredEvent) => {
          const id = $(event.currentTarget).data('id');
          this.confirmDelete(id);
        });

        $(this.table.nativeElement).on('change', '.row-checkbox', () => {
          this.toggleButtonVisibility('btncreateEL');
        });
      }

      confirmDelete(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
          this.deleteRecord(id);
        }
      }

      toggleButtonVisibility(buttonId: string): void {
        debugger
        const anyChecked = $(this.table.nativeElement).find('.row-checkbox:checked').length > 0;
        const button = $(`#${buttonId}`);
        if (anyChecked) {
          button.show();
        } else {
          button.hide();
        }
      }

      deleteRecord(id: number): void {
        this.DataServices.deleteAssignment(id).subscribe({
          next: () => {
            ShowDone('Record has been deleted successfully');
            this.initializeDataTable();
            this.initializeELDataTable();
          },
          error: error => console.error('Error deleting record', error)
        });
      }

      loadClients(): void {
        this.isLoading = true;
        this.dropDownService.getClients(this.searchQuery)
          .subscribe(data => {
            this.clients = data;
            this.isLoading = false;
          });
      }

      handleButtonClick(): void {
        debugger;
        const Clientid = this.ELForm.value.Client?.ID;
        const selectedIds = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(checkbox => (checkbox as HTMLInputElement).value);
        if (selectedIds.length === 0) {
            alert('Please select at least one checkbox.');
            return;
        } else {
            this.DataServices.createEL(selectedIds,Clientid).subscribe({
                next: () => {
                    ShowDone('Engagement letter has been created successfully');
                    this.initializeDataTable();
                    this.initializeELDataTable();
                },
                error: (error: any) => {
                    console.error('Error deleting record', error);
                }
            });
        }
    }
    

      loadAssignments(): void {
        this.isLoading = true;
        this.dropDownService.getAssignments(this.searchQuery)
          .subscribe(data => {
            this.Assignments = data;
            this.isLoading = false;
          });
      }

      loadClientdetails(): void {
        this.dropDownService.getClientDetails(this.ELForm.value.Client?.ID)
          .subscribe(data => {
            if (data && data.length > 0) {
              const clientData = data[0];
              this.ELForm.patchValue({
                TRNNo: clientData.TRNNo,
                LicenseNo:clientData.LicenseNo,
                SignatoryName:clientData.SignatoryName,
                SignatoryDesignation:clientData.SignatoryDesignation,
                SignatoryContactNo:clientData.SignatoryContactNo,
                SignatoryEmail:clientData.SignatoryEmail,
                ConcernpersonName:clientData.ConcernpersonName,
                ConcernpersonDesignation:clientData.ConcernpersonDesignation,
                ConcernpersonContactNo:clientData.ConcernpersonContactNo,
                ConcernpersonEmail:clientData.ConcernpersonEmail
              });
            }
          });
      }
      validateAndSubmit() {
        const isValid = (window as any)['CheckRequiredField']('reqa');
  
        if (isValid) {
          this.onSubmit();
          this.initializeDataTable();
          this.initializeELDataTable();
        }
      }

      onSubmit() {
        debugger
        if (this.ELForm.valid) {
         debugger
          const AssignmentData = this.ELForm.value;
          AssignmentData.SubmittedBy = "1";
          AssignmentData.Opcode = "1";
          AssignmentData.Autoid = 1;
          AssignmentData.CreatedOn = "2024-08-30"; 
          
          const transformedAssignmentData = {
            ClientID: AssignmentData.Client?.ID || '',
            AssignmentId: AssignmentData.Assignment?.ID || '',
            StartDate: AssignmentData.StartDate || '',
            EndDate: AssignmentData.EndDate || '',
            PeriodType: AssignmentData.PeriodType?.ID || '',
            Mode: AssignmentData.mode || '',
            ProfessionalFee: AssignmentData.ProfessionalFee || '',
            PeriodValue: AssignmentData.PeriodValue || '',
            TotalAmount: AssignmentData.TotalAmount || '',
            VatPercent: AssignmentData.vatpercent || '',
            VatAmount: AssignmentData.vatamnt || '',
            AmountIncVat: AssignmentData.Netamnt || '',
            AuthorityFee: AssignmentData.AuthorityFee || '',
            AdvancePercent: AssignmentData.Advancepercent || '',
            AdvanceAmount: AssignmentData.AdvanceAmnt || '',
            SubmittedBy: AssignmentData.SubmittedBy || '',
            Opcode: AssignmentData.Opcode || '',
            CreatedOn: AssignmentData.CreatedOn || '',
            Autoid: AssignmentData.Autoid || null,
            TRNNo: AssignmentData.TRNNo || '',
            LicenseNo: AssignmentData.LicenseNo || '',
            SignatoryName: AssignmentData.SignatoryName || '',
            SignatoryDesignation: AssignmentData.SignatoryDesignation || '',
            SignatoryContactNo: AssignmentData.SignatoryContactNo || '',
            SignatoryEmail: AssignmentData.SignatoryEmail || '',

            ConcernpersonName: AssignmentData.ConcernpersonName || '',
            ConcernpersonDesignation: AssignmentData.ConcernpersonDesignation || '',
            ConcernpersonContactNo: AssignmentData.ConcernpersonContactNo || '',
            ConcernpersonEmail: AssignmentData.ConcernpersonEmail || ''
        };
       
        this.DataServices.submitAssignment(transformedAssignmentData).subscribe({
           
            next: response => {
              console.log('Assignment submitted successfully', response);
              ShowDone('Assignment added successfully');
              this.initializeDataTable();
          },
          error: error => {
              console.error('Error submitting lead', error);
             
          }
          });
        
      }
      }    
      onClientChange(event: any) {
       
        const selectedClient = event.value;
        this.loadClientdetails();
        this.initializeDataTable();
        this.initializeELDataTable();
      }
      onSearch(event: any, dropdownType: string): void {
        if (dropdownType === 'clients') {
            this.searchQuery = event.filter;
            this.page = 1;
            this.loadClients();
        } else if (dropdownType === 'assignments') {
            this.searchQuery = event.filter;
            this.page = 1;
            this.loadAssignments();
        }
      }


      calculateValues(): void {
        debugger
        const formValue = this.ELForm.value;
    
        const periodValue = parseFloat(formValue.PeriodValue) || 0;
        const professionalFee = parseFloat(formValue.ProfessionalFee) || 0;
        const totalAmount = periodValue * professionalFee;
        this.ELForm.get('TotalAmount')?.setValue(totalAmount.toFixed(2));
    
        const discountPercent = parseFloat(formValue.DiscountPercent) || 0;
        const discountAmount = (totalAmount * discountPercent) / 100;
        this.ELForm.get('DiscountAmount')?.setValue(discountAmount.toFixed(2));
    
        const amountAfterDiscount = totalAmount - discountAmount;
    
        const vatPercent = parseFloat(formValue.vatpercent) || 0;
        const vatAmount = (amountAfterDiscount * vatPercent) / 100;
        this.ELForm.get('vatamnt')?.setValue(vatAmount.toFixed(2));
    
        const actualAmount = amountAfterDiscount + vatAmount;
        this.ELForm.get('ActualAmount')?.setValue(actualAmount.toFixed(2));
    
        const authorityFee = parseFloat(formValue.AuthorityFee) || 0;
        const netAmount = actualAmount + authorityFee;
        this.ELForm.get('Netamnt')?.setValue(netAmount.toFixed(2));
    
        const advancePercent = parseFloat(formValue.Advancepercent) || 0;
        let advanceAmount = 0;
        if (advancePercent === 10) {
          advanceAmount = (netAmount * 10) / 100;
        } else if (advancePercent === 5) {
          advanceAmount = (netAmount * 5) / 100;
        } else if (advancePercent === 25) {
          advanceAmount = (netAmount * 25) / 100;
        } else if (advancePercent === 50) {
          advanceAmount = netAmount / 2;
        } else if (advancePercent === 75) {
          advanceAmount = (netAmount * 75) / 100;
        } else if (advancePercent === 100) {
          advanceAmount = netAmount;
        }
        this.ELForm.get('AdvanceAmnt')?.setValue(advanceAmount.toFixed(2));
      }


      initializeELDataTable(): void {
      
        if (!this.tableEL || !this.tableEL.nativeElement) {
          console.error('Table element is not available.');
          return;
        }
      
        // Check if DataTable is already initialized
        if ($.fn.DataTable.isDataTable(this.tableEL.nativeElement)) {
          $(this.tableEL.nativeElement).DataTable().clear().destroy();
        }
        $(this.tableEL.nativeElement).DataTable({
          
          serverSide: true,
          processing: true,
          scrollX: true, 
          ajax: (data: any, callback: any, settings: any) => {
            const page = Math.floor(data.start / data.length) + 1;
            const pageSize = data.length;
            const draw = data.draw;
            const search = data.search.value;
            const sortColumnIndex  = data.order[0].column;
            const sortDirection = data.order[0].dir;
            const sortColumn = data.columns[sortColumnIndex].data;
            this.queryParams = [
              { param: 'Opcode', value: '5', op: 's' },
              { param: 'ClientID', value: this.ELForm.value.Client?.ID || ''},
             
            ];
             debugger
            this.DataServices.getEngagementLetter(page, pageSize, this.queryParams, search, sortColumnIndex, sortDirection).subscribe({
              next: response => {
                callback({
                  draw: draw,
                  recordsTotal: response.recordsFiltered,
                  recordsFiltered: response.recordsTotal,
                  data: response.data
                });
              },
              error: error => console.error('Error fetching lead data', error)
            });
          },
          columns: [
            {
              title: '<input type="checkbox" id="select-all">',
              data: 'Autoid',
              render: (data: any) => {
                return `<input type="checkbox" class="row-checkbox" value="${data}">`;
              },
              orderable: true
            },
            { title: 'SI.No', data: 'RowNum' },
             { title: 'ID', data: 'ELID' },
            { title: 'Is Sent', data: 'isELSentforSign' },
            { title: 'Assignments', data: 'NoOfAssignments' },
            { title: 'Gross Amount', data: 'GrossAmount' },
            { title: 'Vat Amount', data: 'VatAmount' },
            { title: 'AuthorityFee', data: 'TotalAuthorityFee' },
            { title: 'NetAmount', data: 'NetAmount' },
            { title: 'AdvanceAmount', data: 'AdvanceAmount' },
            {
              title: 'CreatedOn',
              data: null,
              render: (data: any, type: any, row: any) => {
                const createdOn = row.CreatedOn ? `On: ${new Date(row.CreatedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'On: N/A';
                const createdBy = row.Createdby || 'Unknown';
                return `${createdOn}<br>By: ${createdBy}`;
              }
            },
            {
              title: 'Action',
              data: 'Autoid',
              render: (data: any, type: any, row: any) => {
                const clientAutoid = row.ClientAutoid;
                return ` <button type="button" class="btn btn-xs bgGreen view-btn" data-id="${row.Autoid}" data-client-id="${clientAutoid}"><i class="fa fa-eye"></i></button>`;
              }
            }
          ]
        });
        $(this.tableEL.nativeElement).off('click', '.view-btn');
       
        $(this.tableEL.nativeElement).on('click', '.view-btn', (event: JQuery.TriggeredEvent) => {
          debugger
          const autoid = $(event.currentTarget).data('id');
          const clientId = $(event.currentTarget).data('client-id');
        
          // Navigate to the viewEL page with the Autoid and ClientID as route parameters
          this.router.navigate(['/ViewEL', autoid, clientId]);
        });

        $(this.tableEL.nativeElement).on('change', '.row-checkbox', () => {
          this.toggleButtonVisibility('btncreateEL');
        });
      }

 
}
