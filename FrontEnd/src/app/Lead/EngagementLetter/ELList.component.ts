import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-EL-list',
  templateUrl: 'ELList.component.html'
})
export class ELListComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  
  ELList: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  clients: { ID: number; Name: string }[] = [];
  ELNO: string = '';
  QNNO: string = '';
  searchQuery: string = '';
  
  dtOptions: any = {}; 
  tableData: any[] = []; 
  page: number = 1; 
  pageSize: number = 10; 
  queryParams: any[] = [];
  selectedLead: any = {};

  constructor(private dataService: DataServices,private dropDownService: DropDownServiceService,private fb: FormBuilder,private router: Router) { 

    this.ELList = this.fb.group({
        Client: ['']
    });
  }

  ngOnInit(): void {
    this.queryParams = [
      { param: 'Opcode', value: '12', op: 's' },
      { param: 'ELNO', value: this.ELNO, op: 's' },
      { param: 'QNNO', value: this.QNNO, op: 's' },
      { param: 'ClientID', value: this.ELList.value.Client?.ID || ''},
    ];
    this.loadClients();
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  
  loadClients(): void {
    this.isLoading = true;
    this.dropDownService.getClients(this.searchQuery)
      .subscribe(data => {
        this.clients = data;
        this.isLoading = false;
      });
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

        this.dataService.getEngagementLetterALL(page, pageSize, this.queryParams, search, sortColumnIndex, sortDirection).subscribe({
          next: response => {
            callback({
              draw: draw,
              recordsTotal: response.recordsFiltered,
              recordsFiltered: response.recordsTotal,
              data: response.data
            });
          },
          error: error => console.error('Error fetching  data', error)
        });
      },
      columns: [
        {
          title: '<input type="checkbox" id="select-all">',
          data: 'Autoid',
          render: (data: any, type: any, row: any) => {
            return `<input type="checkbox" class="row-checkbox" data-client-id="${row.ClientAutoid}" value="${data}">`;
          },
          orderable: true
        },
        { title: 'SI.No', data: 'RowNum' },
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
        {
          title: 'Is Confirmed',
          data: null,
          render: (data: any, type: any, row: any) => {
            const isConfirmed = row.IsConfirmed ? 
              '<span class="badge bg-success">Yes</span>' : 
              '<span class="badge bg-warning">No</span>';
            return isConfirmed;
          }
        },
        {
            title: 'ID',
            data: null,
            render: (data: any, type: any, row: any) => {
              const comELID = row.ELID;
              const comQNID = row.QUOTID;
              return `<div><span>${comELID}</span></div><div><span>${comQNID}</span></div>`;
            },
            orderable: true
          },
        // { title: 'ID', data: 'ELID' },
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
            const IsConfirmed = row.IsConfirmed;
            const confirmBtnDisabled = IsConfirmed == 1 ? 'disabled-btn' : '';
            const deleteBtnDisabled = IsConfirmed == 1 ? 'disabled-btn' : '';

            return `<div style='display:inline-flex;'> <button type="button" title="Download Engagement Letter"  class="btn btn-xs bgOrange view-btn" data-id="${row.Autoid}" data-client-id="${clientAutoid}"><i class="fa fa-cloud-arrow-down"></i></button> 
            <button type="button" title="Download Quotation"  class="btn btn-xs bgOrange view-Qnbtn" data-id="${row.Autoid}" data-client-id="${clientAutoid}"><i class="fa fa-newspaper"></i></button> </div>`;
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

    $(this.table.nativeElement).off('click', '.view-btn');
        $(this.table.nativeElement).off('click', '.view-Qnbtn');
        $(this.table.nativeElement).on('click', '.view-btn', (event: JQuery.TriggeredEvent) => {
          debugger
          const autoid = $(event.currentTarget).data('id');
          const clientId = $(event.currentTarget).data('client-id');
          const url = `#/ViewEL/${autoid}/${clientId}`;
          window.open(url, '_blank');
         
        });
        $(this.table.nativeElement).on('click', '.view-Qnbtn', (event: JQuery.TriggeredEvent) => {
          debugger
          const autoid = $(event.currentTarget).data('id');
          const clientId = $(event.currentTarget).data('client-id');
          //const url = this.router.serializeUrl(this.router.createUrlTree(['/ViewQuote', autoid, clientId]));
          //window.open(url, '_blank');
          const url = `#/ViewQuote/${autoid}/${clientId}`;
          window.open(url, '_blank');
          //this.router.navigate(['/ViewQuote', autoid, clientId]);

        });

  }

  onFilterChange(): void {
  debugger
    const formValues = this.ELList.value;
    this.queryParams = [
        { param: 'Opcode', value: '12', op: 's' },
        { param: 'ELNO', value: this.ELNO, op: 's' },
        { param: 'QNNO', value: this.QNNO, op: 's' },
        { param: 'ClientID', value: this.ELList.value.Client?.ID || ''},
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
      const selectedCheckbox = selectedCheckboxes[0] as HTMLInputElement;
      const selectedServiceId = (selectedCheckboxes[0] as HTMLInputElement).value;
      const clientId = selectedCheckbox.getAttribute('data-client-id');
      this.router.navigate(['/EL'], { queryParams: { ClientID: clientId } });
    } else if (selectedCheckboxes.length > 1) {
      alert('Please select only one to edit.');
    } else {
      alert('Please select one to edit.');
    }
  }

  navigateToAdd() {
    debugger
    this.router.navigate(['/ELList']);
  }


  onClientChange(event: any) {
    debugger
    const formValues = this.ELList.value;
    this.queryParams = [
        { param: 'Opcode', value: '12', op: 's' },
        { param: 'ELNO', value: this.ELNO, op: 's' },
        { param: 'QNNO', value: this.QNNO, op: 's' },
        { param: 'ClientID', value: this.ELList.value.Client?.ID || ''},
    ];

    // Reload DataTable
    if ($.fn.DataTable.isDataTable(this.table.nativeElement)) {
      $(this.table.nativeElement).DataTable().ajax.reload();
    }
  }
  onSearch(event: any, dropdownType: string): void {
    if (dropdownType === 'clients') {
        this.searchQuery = event.filter;
        this.page = 1;
        this.loadClients();
    }
  }

  
}
