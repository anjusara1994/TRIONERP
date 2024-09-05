import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServices } from '../../Services/DataServices.service';

@Component({
  selector: 'app-servicelistadd',
  templateUrl: 'service-listadd.component.html',
})
export class servicelistaddComponent implements OnInit,AfterViewInit {
  ServiceForm: FormGroup = new FormGroup({});
  editors: { [key: string]: any } = {};
  isEditMode: boolean = false;
  AssignmentId?: number; 
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private route: ActivatedRoute,private DataServices: DataServices) {}

  ngOnInit() {
    // Initialize the form group with form controls
    this.ServiceForm = this.fb.group({
      AssignmentName: [''],
      ETC: [''],
      ScopeOfWork: [''],
      Objectives: [''],
      FirstPartyResponsibility: [''],
      SecondPartyResponsibility: [''],
      Limitations: [''],
      Report: [''],
      OtherMatters: [''],
    });

    this.route.queryParams.subscribe(params => {
      if (params['serviceId']) {
        this.AssignmentId = +params['serviceId'];
        this.isEditMode = true;
        // Load data for the AssignmentId if needed
        this.loadAssignmentData(this.AssignmentId);
      }
    });
  }

  ngAfterViewInit() {
    this.initializeEditor('#editor1', 'ScopeOfWork');
    this.initializeEditor('#editor2', 'Objectives');
    this.initializeEditor('#editor3', 'FirstPartyResponsibility');
    this.initializeEditor('#editor4', 'SecondPartyResponsibility');
    this.initializeEditor('#editor5', 'Limitations');
    this.initializeEditor('#editor6', 'Report');
    this.initializeEditor('#editor7', 'OtherMatters');
  }

  initializeEditor(selector: string, formControlName: string) {
    (window as any).ClassicEditor
      .create(document.querySelector(selector))
      .then((editor: any) => {
        this.editors[formControlName] = editor;
        editor.model.document.on('change:data', () => {
          this.ServiceForm.controls[formControlName].setValue(editor.getData());
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  onSubmit(): void {
    if (this.ServiceForm.valid) {
        debugger
        const formData = {
          ...this.ServiceForm.value,
          Opcode: '7'
        };
        this.DataServices.submitService(formData).subscribe({
           
            next: response => {
              console.log('Service added successfully', response);
              ShowDone('Service added successfully');
              this.ServiceForm.reset();
              this.router.navigate(['/Services']);
          },
          error: error => {
              console.error('Error submitting Service', error);
             
          }
          });
    } 
    else {
      console.error('Form is invalid');
    }
  }

  navigateToServiceList(): void {
    const confirmation = window.confirm('Are you sure you want to cancel?');
    if (confirmation) {
      this.router.navigate(['/Services']);
    }
  }

  loadAssignmentData(assignmentId: number): void {
    this.DataServices.getServiceById(assignmentId).subscribe({
      next: response => {
        // Assuming response is an array and you need to access the first element
        if (response && response.length > 0) {
          const assignmentData = response[0]; // Accessing the first element of the array
  
          this.ServiceForm.patchValue({
            AssignmentName: assignmentData.AssignmentName || '',
            ETC: assignmentData.ETC || '',
            ScopeOfWork: assignmentData.ScopeOfWork || '',
            Objectives:assignmentData.Objectives || '',
            frespons:assignmentData.FirstPartyResponsibility || '',
          });
          if (this.editors['ScopeOfWork']) {
            this.editors['ScopeOfWork'].setData(assignmentData.ScopeOfWork || '');
          }
          if (this.editors['Objectives']) {
            this.editors['Objectives'].setData(assignmentData.Objectives || '');
          }
          if (this.editors['frespons']) {
            this.editors['frespons'].setData(assignmentData.FirstPartyResponsibility || '');
          }
          console.log('AssignmentName:', assignmentData.AssignmentName);
        } else {
          console.error('No data found for the given AssignmentId');
        }
      },
      error: error => {
        console.error('Error loading assignment data', error);
      }
    });
  }
  
  

}
