import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataServices } from '../../Services/DataServices.service';
import { DropDownServiceService } from '../../Services/drop-down-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery globally
@Component({
  selector: 'app-service-list',
  templateUrl: 'service-list.component.html'
})
export class ServiceListComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', { static: false }) table!: ElementRef;
  
  serviceList: FormGroup = new FormGroup({});
  authorities: { ID: number; Name: string }[] = [];
  sources:{ ID: number; Name: string }[] = [];
  
  dtOptions: any = {}; 
  tableData: any[] = []; 
  page: number = 1; 
  pageSize: number = 10; 
  queryParams: any[] = [];

  constructor(private dataService: DataServices,private fb: FormBuilder,private router: Router) { 
  }

  ngOnInit(): void {
    this.queryParams = [
      { param: 'Opcode', value: '6', op: 's' }
    ];
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

        this.dataService.getAssignments(page, pageSize, this.queryParams, search, sortColumnIndex, sortDirection).subscribe({
          next: response => {
            callback({
              draw: draw,
              recordsTotal: response.recordsFiltered,
              recordsFiltered: response.recordsTotal,
              data: response.data
            });
          },
          error: error => console.error('Error fetching Service data', error)
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
        { title: 'Service Name', data: 'ServiceName' },
        { title: 'ETC', data: 'ClientETC' },
        {
          title: 'CreatedOn',
          data: null,
          render: (data: any, type: any, row: any) => {
            const createdOn = row.CreatedOn ? `On: ${new Date(row.CreatedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'On: N/A';
            const createdBy = row.createdBy || 'Unknown';
            return `${createdOn}<br>By: ${createdBy}`;
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
 
  }

  onEditButtonClick(event: Event): void {
    event.preventDefault(); // Prevent default behavior
    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    if (selectedCheckboxes.length === 1) {
      const selectedServiceId = (selectedCheckboxes[0] as HTMLInputElement).value;
      this.router.navigate(['/AddServices'], { queryParams: { serviceId: selectedServiceId } });
    } else if (selectedCheckboxes.length > 1) {
      alert('Please select only one service to edit.');
    } else {
      alert('Please select a service to edit.');
    }
  }
  navigateToAdd() {
    debugger
    this.router.navigate(['/Services']);
  }
}
