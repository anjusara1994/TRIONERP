import { Component, ViewChild, ElementRef, AfterViewInit, Output, Input, EventEmitter } from '@angular/core';
import { DataServices } from '../Services/DataServices.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signature-popup',
  templateUrl: './signature-popup.component.html',
  styleUrls: ['./signature-popup.component.css']
})
export class SignaturePopupComponent implements AfterViewInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() signatureSaved = new EventEmitter<string>();

  @Input() Signclientid!: string; 
  @Input() Signautoid!: string;

  signatureOption: 'draw' | 'upload' = 'draw'; 
  uploadedSignature: string | null = null; 
  private isDrawing = false;
  private ctx!: CanvasRenderingContext2D;
 
  constructor(private DataServices: DataServices, private authService: AuthService ) { }

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  // Initialize or reset the canvas context
  initializeCanvas() {
    if (this.signatureOption === 'draw') {
      const canvasElement = this.signatureCanvas.nativeElement;
      canvasElement.width = canvasElement.parentElement?.clientWidth || 400;
      canvasElement.height = canvasElement.parentElement?.clientHeight || 200;
      // Set up canvas context
      this.ctx = canvasElement.getContext('2d')!;
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#000';
      this.ctx.lineCap = 'round';
      

      // Clear canvas if it's being re-initialized
      this.clearSignature();

      // Ensure events are attached only once
      canvasElement.onmousedown = (event) => this.startDrawing(event);
      canvasElement.onmousemove = (event) => this.draw(event);
      canvasElement.onmouseup = () => this.stopDrawing();
      canvasElement.onmouseleave = () => this.stopDrawing();
    }
  }

  // Start drawing on canvas
  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.ctx.beginPath();
    this.draw(event); // Start drawing immediately when mouse down
  }

  // Draw on the canvas
  draw(event: MouseEvent) {
    if (!this.isDrawing) return;
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    this.ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    this.ctx.stroke();
  }

  // Stop drawing
  stopDrawing() {
    this.isDrawing = false;
    this.ctx.beginPath(); // Reset the path so it doesn't connect to the next drawing
  }

  // Clear the canvas
  clearSignature() {
    this.ctx.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
  }

  // Toggle between draw and upload options
  toggleSignatureOption(option: 'draw' | 'upload'): void {
    this.signatureOption = option;
    if (option === 'draw') {
      setTimeout(() => this.initializeCanvas(), 0); // Re-initialize the canvas when switching to 'draw' mode
    }
  }


  // saveSignature() {
  //   debugger
  //   if (this.signatureOption === 'draw') {
     
  //     const dataURL = this.signatureCanvas.nativeElement.toDataURL('image/png');
  //     this.signatureSaved.emit(dataURL); 
  //   } else if (this.signatureOption === 'upload' && this.uploadedSignature) {
      
  //     this.signatureSaved.emit(this.uploadedSignature); 
  //     this.saveSignatureToServer(this.uploadedSignature);
  //   }
  // }

  saveSignature() {
    if (this.signatureOption === 'draw') {
      const dataURL = this.signatureCanvas.nativeElement.toDataURL('image/png');
      this.signatureSaved.emit(dataURL); 
    } else if (this.signatureOption === 'upload' && this.uploadedSignature) {
      this.signatureSaved.emit(this.uploadedSignature); 
    }
  }

  saveSignatureToServer(signatureBase64: string) {
    debugger
    const payload = {
      File: signatureBase64,
      autoid: this.Signautoid,
      clientid: this.Signclientid,
      SubmittedBy : this.authService.currentUserId,
    };
    this.DataServices.saveSignature(payload).subscribe({
        next: (response) => {
            console.log('Signature saved successfully', response);
          },
          error: (error) => {
            console.error('Error saving signature', error);
          }
      });
  }
  

  // Handle file upload for signature
  onFileChange(event: Event) {
    debugger
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const fileType = file.type;
  
      if (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedSignature = e.target.result;
          console.log('Uploaded file:', e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.uploadedSignature = null;
        alert('Invalid file type. Please upload a PNG, JPG, or JPEG image.');
      }
    }
  }
  
}
