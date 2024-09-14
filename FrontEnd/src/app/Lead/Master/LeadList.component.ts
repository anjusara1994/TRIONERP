import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataServices } from '../../Services/DataServices.service';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-lead-list',
  templateUrl: 'LeadList.component.html'
})
export class LeadListComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  
  leadList: FormGroup = new FormGroup({});
  authorities: { ID: number; Name: string }[] = [];
  salesPersons:{ ID: number; Name: string }[] = [];
  sources:{ ID: number; Name: string }[] = [];
  
  dtOptions: any = {}; 
  tableData: any[] = []; 
  page: number = 1; 
  pageSize: number = 10; 
  queryParams: any[] = [];
  selectedLead: any = {};

  constructor(private dataService: DataServices,private dropDownService: DropDownServiceService,private fb: FormBuilder,private router: Router) { 

    this.leadList = this.fb.group({
      SalesPerson: [''],
      Authority: [''],
      Source: ['']
    });
  }

  ngOnInit(): void {
    this.queryParams = [
      { param: 'Opcode', value: '2', op: 's' },
      { param: 'SalesPerson', value: null, op: 'id' },
      { param: 'Authority', value: null, op: 'id' },
      { param: 'Source', value: null, op: 'id' }
    ];
    
    this.dropDownService.getAuthorities(data => {
        this.authorities = data;
      });

      this.dropDownService.getsalespersons(data => {
        this.salesPersons = data;
      });

      this.dropDownService.getSource(data => {
        this.sources = data;
      });

      
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  initializeDataTable(): void {
    $(this.table.nativeElement).DataTable({
      serverSide: true,
      processing: true,
      ajax: (data: any, callback: any, settings: any) => {
        const page = Math.floor(data.start / data.length) + 1;
        const pageSize = data.length;
        const draw = data.draw;
        const search = data.search.value;
        const sortColumnIndex  = data.order[0].column;
        const sortDirection = data.order[0].dir;
        const sortColumn = data.columns[sortColumnIndex].data;

        this.dataService.getLeads(page, pageSize, this.queryParams, search, sortColumnIndex, sortDirection).subscribe({
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
        // { title: 'Client', data: 'CompanyName' },
        {
          title: 'Client',
          data: null,
          render: (data: any, type: any, row: any) => {
            const comname = row.CompanyName;
            const comClientID = row.ClientID;
            return `<div><span>${comname}</span></div><div><span>${comClientID}</span></div>`;
          },
          orderable: true
        },
        { title: 'Authority', data: 'Authority' },
        { title: 'ContactPerson', data: 'ContactPerson' },
        { title: 'MobileNumber', data: 'MobileNumber' },
        { title: 'EmailId', data: 'EmailId' },
        { title: 'Landline', data: 'Landline' },
        { title: 'Designation', data: 'Designation' },
        { title: 'SalesPerson', data: 'SalesPerson' },
        // { title: 'Source', data: 'Source' },
        // { title: 'Area', data: 'Area' },
        // { title: 'Emirates', data: 'EmiratesName' },
        // { title: 'Country', data: 'CountryName' },
        {
          title: 'CreatedOn',
          data: null,
          render: (data: any, type: any, row: any) => {
            const createdOn = row.CreatedOn ? `On: ${new Date(row.CreatedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'On: N/A';
            const createdBy = row.Createdby || 'Unknown';
            return `${createdOn}<br>By: ${createdBy}`;
          }
        }
        ,
            {
              title: 'Action',
              data: 'Autoid',
              render: (data: any, type: any, row: any) => {
                const Autoid = row.Autoid;
                return ` <button type="button" class="btn-xs bgGreen view-btn" data-id="${row.Autoid}" data-client-id="${Autoid}"><i class="fa fa-eye"></i></button>`;
              }
            }
      ]
    });
    this.table.nativeElement.addEventListener('change', (event: any) => {
      if (event.target.classList.contains('row-checkbox')) {
        const checkboxes = this.table.nativeElement.querySelectorAll('.row-checkbox');
        checkboxes.forEach((checkbox: any) => {
          if (checkbox !== event.target) {
            checkbox.checked = false;
          }
        });
      }
    });

    $(this.table.nativeElement).on('click', '.view-btn', (event: any) => {
      const autoid = $(event.target).closest('button').data('id');
      this.showLeadDetails(autoid);  // Call method to show popup
    });
  }

  onFilterChange(): void {
  debugger
    const formValues = this.leadList.value;
    this.queryParams = [
      { param: 'Opcode', value: '2', op: 's' },
      { param: 'SalesPerson', value: formValues.SalesPerson?.ID || '' },
      { param: 'Authority', value: formValues.Authority?.ID || ''},
      { param: 'Source', value: formValues.Source?.ID || ''}
    ];

    // Reload DataTable
    if ($.fn.DataTable.isDataTable(this.table.nativeElement)) {
      $(this.table.nativeElement).DataTable().ajax.reload();
    }
  }

  onEditButtonClick(event: Event): void {
    event.preventDefault();
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    if (selectedCheckboxes.length === 1) {
      const selectedServiceId = (selectedCheckboxes[0] as HTMLInputElement).value;
      this.router.navigate(['/Lead'], { queryParams: { LeadId: selectedServiceId } });
    } else if (selectedCheckboxes.length > 1) {
      alert('Please select only one lead to edit.');
    } else {
      alert('Please select a lead to edit.');
    }
  }

  navigateToAdd() {
    debugger
    this.router.navigate(['/LeadList']);
  }


  showLeadDetails(Autoid: number): void {
    // Fetch additional lead details by Autoid
    this.dataService.getLeadById(Autoid).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.selectedLead = response[0];  // Store the lead details in a variable
          this.openBootstrapModal();  // Trigger the Bootstrap modal
        } else {
          console.error('No data found for the given Autoid');
        }
      },
      error: (error) => {
        console.error('Error fetching lead details', error);
      }
    });
  }
  
  openBootstrapModal(): void {
    // Use Bootstrap's JavaScript API to show the modal
    const modalElement = document.getElementById('leadDetailsModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }
  
}
