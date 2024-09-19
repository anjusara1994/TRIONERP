import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { DataServices } from '../../Services/DataServices.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

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
  salesPersons:{ ID: number; Name: string }[] = [];
  statuses:{ ID: number; Name: string }[] = [];
  Assignments: { ID: number; Name: string }[] = [];
  ELNO: string = '';
  QNNO: string = '';
  searchQuery: string = '';
  selectedAssignmentId!: number;
  dtOptions: any = {}; 
  tableData: any[] = []; 
  page: number = 1; 
  pageSize: number = 10; 
  queryParams: any[] = [];
  selectedAssignment: any = {};
  selectedRemarks: any = {};

  constructor(private dataService: DataServices,private dropDownService: DropDownServiceService, private authService: AuthService ,private fb: FormBuilder,private router: Router) { 

    this.ReportList = this.fb.group({
        Client: [''],
        Assignment:[''],
        primaryAssigner: [null],
        secondaryAssigner: [null],
        ELNO:[''],
        Status:[''],
        Remarks:[''],

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
    this.dropDownService.getsalespersons(data => {
      this.salesPersons = data;
    });

    this.dropDownService.getStatus(data => {
      this.statuses = data;
    });
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
        {
          title: 'Assignment Name',
          data: null,
          render: (data: any, type: any, row: any) => {
            const AssignmentName = row.AssignmentName;
            const AssinPeriod = row.PeriodFrom;
            return `<div><span>${AssignmentName}</span></div><div><span>${AssinPeriod}</span></div>`;
          },
          orderable: true
        },
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
            title: 'Assigner',
            data: null,
            render: (data: any, type: any, row: any) => {
              const PAssigner = row.Primaryassigner ? row.Primaryassigner : ''; 
              const SAssigner = row.Secondaryassigner ? row.Secondaryassigner : '';
              return `<div style='display:inline-flex;padding: 2px 2px 2px 2px;'><span style='background-color: #c4b5b5;width: 120px;display: flex;'>Primary Assigner : </span>${PAssigner} </div><br><div style='display:inline-flex;padding: 2px 2px 2px 2px;'><span style='background-color: #c4b5b5;width: 120px;display: flex;'>Secondary Assigner : </span>${SAssigner} </div>`;
            }
          },
          {
            title: 'Status',
            data: null,
            render: (data: any, type: any, row: any) => {
              let badgeClass = '';
              let statusText = '';
          
              // Check the status and assign the appropriate class and text
              switch (row.StatusName) {
                case 'Pending':
                  badgeClass = 'bg-warning';
                  statusText = 'Pending';
                  break;
                case 'Cancelled':
                  badgeClass = 'bg-danger';
                  statusText = 'Cancelled';
                  break;
                case 'Assigned':
                  badgeClass = 'bg-primary';
                  statusText = 'Assigned';
                  break;
                case 'Confirmed':
                  badgeClass = 'bg-success';
                  statusText = 'Confirmed';
                  break;
                default:
                  badgeClass = 'bg-secondary'; // Fallback color for unknown or undefined statuses
                  statusText = 'Unknown Status';
              }
          
              // Return the formatted HTML for the badge
              return `<span class="badge ${badgeClass}">${statusText}</span>`;
            }
          },
          
        // { title: 'Period', data: 'PeriodFrom' },
        // { title: 'Period', data: 'PeriodFrom' },
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
            
            return ` <button type="button" class="btn-xs bgGreen view-btn" data-id="${row.Autoid}" data-client-id="${row.Autoid}"><i class="fa fa-eye"></i></button>`;
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
      this.showDetails(autoid);  // Call method to show popup
    });
   
   
  }

  showDetails(Autoid: number): void {
    this.selectedAssignment = [];
    this.selectedRemarks = [];
    this.dataService.getAssignmenttById(Autoid).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          debugger
          this.selectedAssignment = response.data;
          this.loadRemarks(Autoid);
          
        } else {
          console.error('No data found for the given Assignment');
        }
        this.openDetailsBootstrapModal(); 
      },
      error: (error) => {
        console.error('Error fetching assignment details', error);
      }
    });
  }

  loadRemarks(Autoid: number): void {
    this.dataService.getRemarksById(Autoid).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.selectedRemarks = response.data;
        } else {
          console.error('No remarks found for the given Assignment');
        }
      },
      error: (error) => {
        console.error('Error fetching remarks', error);
      }
    });
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

  onAssignButtonClick(event: Event): void {
    event.preventDefault();
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    if (selectedCheckboxes.length === 1) {
      const selectedCheckbox = selectedCheckboxes[0] as HTMLInputElement;
      const selectedServiceId = (selectedCheckboxes[0] as HTMLInputElement).value;
      this.selectedAssignmentId = parseInt(selectedCheckbox.value, 10); 
      this.openBootstrapModal(); 
    } else if (selectedCheckboxes.length > 1) {
      alert('Please select only one to edit.');
    } else {
      alert('Please select one to edit.');
    }
  }

  onUpdateButtonClick(event: Event): void {
    event.preventDefault();
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    if (selectedCheckboxes.length === 1) {
      const selectedCheckbox = selectedCheckboxes[0] as HTMLInputElement;
      const selectedServiceId = (selectedCheckboxes[0] as HTMLInputElement).value;
      this.selectedAssignmentId = parseInt(selectedCheckbox.value, 10); 
      this.openRemarksBootstrapModal(); 
    } else if (selectedCheckboxes.length > 1) {
      alert('Please select only one to edit.');
    } else {
      alert('Please select one to edit.');
    }
  }

  onSubmit(): void {
    debugger
    if (this.ReportList.valid) {
      const assignData = {
        assignmentId: this.selectedAssignmentId,
        primaryAssignerId: this.ReportList.value.primaryAssigner.ID,  // Assuming id is in the dropdown options
        secondaryAssignerId: this.ReportList.value.secondaryAssigner?.ID || null,
        SubmittedBy : this.authService.currentUserId,
        Opcode : '14',
      };

      this.dataService.saveAssignment(assignData).subscribe({
        next: (response) => {
          this.closeBootstrapModal();
          ShowDone('Assigner has been assigned successfully');
        },
        error: (err) => {
          ShowError('Error saving data:'+ err);
        },
      });
    }
  }

  openBootstrapModal(): void {
    // Use Bootstrap's JavaScript API to show the modal
    const modalElement = document.getElementById('AssignDetailsModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  openDetailsBootstrapModal(): void {
    // Use Bootstrap's JavaScript API to show the modal
    const modalElement = document.getElementById('DetailsModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  openRemarksBootstrapModal(): void {
    // Use Bootstrap's JavaScript API to show the modal
    const modalElement = document.getElementById('AssignRemarksModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  closeBootstrapModal(): void {
    const modalElement = document.getElementById('AssignDetailsModal');
    const modal = bootstrap.Modal.getInstance(modalElement!); // Get the already initialized instance
    modal?.hide(); 
  }

  closeRemarksBootstrapModal(): void {
    const modalElement = document.getElementById('AssignRemarksModal');
    const modal = bootstrap.Modal.getInstance(modalElement!); // Get the already initialized instance
    modal?.hide(); 
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


  onSaveStatus(): void {
    debugger
    if (this.ReportList.valid) {
      const assignData = {
        assignmentId: this.selectedAssignmentId,
        StatusID: this.ReportList.value.Status.ID,  // Assuming id is in the dropdown options
        Remarks: this.ReportList.value.Remarks  || '',
        SubmittedBy : this.authService.currentUserId,
        Opcode : '15',
      };

      this.dataService.saveAssignment(assignData).subscribe({
        next: (response) => {
          this.closeRemarksBootstrapModal();
          ShowDone('Details saved successfully');
        },
        error: (err) => {
          ShowDone('Error saving data:'  + err);
        },
      });
    }
  }
}
