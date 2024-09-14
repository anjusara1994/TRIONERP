import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-Report-list',
  templateUrl: 'ReportMaster.component.html'
})
export class ReportListComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  
  ReportList: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  clients: { ID: number; Name: string }[] = [];
  Assignments: { ID: number; Name: string }[] = [];
  ELNO: string = '';
  QNNO: string = '';
  searchQuery: string = '';
  
  dtOptions: any = {}; 
  tableData: any[] = []; 
  page: number = 1; 
  pageSize: number = 10; 
  queryParams: any[] = [];

  constructor(private dataService: DataServices,private dropDownService: DropDownServiceService,private fb: FormBuilder,private router: Router) { 

    this.ReportList = this.fb.group({
        Client: [''],
        Assignment:[''],
    });
  }

  ngOnInit(): void {
    this.queryParams = [
      { param: 'Opcode', value: '13', op: 's' },
      { param: 'ELNO', value: this.ELNO, op: 's' },
      { param: 'ClientID', value: this.ReportList.value.Client?.ID || ''},
      { param: 'AssignemntID', value: this.ReportList.value.Assignment?.ID || ''},
    ];
    this.loadClients();
    this.loadAssignments();
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

  loadAssignments(): void {
    this.isLoading = true;
    this.dropDownService.getAssignments(this.searchQuery)
      .subscribe(data => {
        this.Assignments = data;
        this.isLoading = false;
      });
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
            { param: 'Opcode', value: '13', op: 's' },
            { param: 'ELNO', value: this.ELNO, op: 's' },
            { param: 'ClientID', value: this.ReportList.value.Client?.ID || ''},
            { param: 'AssignemntID', value: this.ReportList.value.Assignment?.ID || ''},
         
        ];
         debugger
        this.dataService.getAssignmentsALL(page, pageSize, this.queryParams, search, sortColumnIndex, sortDirection).subscribe({
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
        { title: 'Period', data: 'PeriodFrom' },
        { title: 'Period', data: 'PeriodFrom' },
        { title: 'Type', data: 'Period' },
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
            
            return ` <button type="button" title="Delete Assignment" class="btn btn-xs bgRed delete-btn" data-elid="${row.ELAutoId}" data-id="${row.Autoid}"><i class="fa fa-eye"></i></button>`;
          }
        }
      ]
    });
    $(this.table.nativeElement).off('click', '.delete-btn');
   
   
  }

  onFilterChange(): void {
  debugger
    const formValues = this.ReportList.value;
    this.queryParams = [
        { param: 'Opcode', value: '12', op: 's' },
        { param: 'ELNO', value: this.ELNO, op: 's' },
        { param: 'QNNO', value: this.QNNO, op: 's' },
        { param: 'ClientID', value: this.ReportList.value.Client?.ID || ''},
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
    this.router.navigate(['/ReportList']);
  }


  onClientChange(event: any) {
    debugger
    const formValues = this.ReportList.value;
    this.queryParams = [
        { param: 'Opcode', value: '12', op: 's' },
        { param: 'ELNO', value: this.ELNO, op: 's' },
        { param: 'QNNO', value: this.QNNO, op: 's' },
        { param: 'ClientID', value: this.ReportList.value.Client?.ID || ''},
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
