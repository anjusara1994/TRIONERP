import { Component, OnInit } from '@angular/core';
import { DataServices } from '../Services/DataServices.service';

@Component({
  selector: 'screening',
  templateUrl: 'Screening.component.html',
  styleUrls: ['Screening.component.css']
})
export class ScreeningComponent implements OnInit {
  data: { FirstName: string; SecondName: string; ListType: string ;FullName: string;ThirdName: string;FourthName:string;Designation:string;
    Nationality: string;UNListType:string;ReferenceNumber:string;ListedOn:string;LastUpdatedDate:string;IndividualAlias:string;IndividualAddress:string;
    Title:string;Comments:string;DateOfBirth:string;
  }[] = [];
  error: string | null = null;
  selectedFilter: string = '';
  name: string = '';
  country: string = '';
  address: string = '';
  loading: boolean = false; // Add this line
  constructor(private dataService: DataServices) {}

  ngOnInit(): void {
    //this.loadData();
  }

  onSubmit(): void {
    this.loading = true;
    const xmlnodepath = this.getXmlNodePath();
    const city = '';  // You can modify this based on your needs
    const state = ''; // You can modify this based on your needs
    const id ='';
    // const country ='dubai';
//    const address ='dubai';

    this.dataService.getUNSCData(xmlnodepath, this.name, id,this.address, city, state,this.country)
      .subscribe({
        next: (response: any[]) => {
          console.log(response);

          if (response.length > 0) {
           
            if (response[0] === "No matching data found.") {
              this.data = []; 
              this.error = 'No data found matching the criteria.'; 
            } else {
              this.data = response.map((item: any) => ({
                FirstName: item.FirstName || 'N/A',
                SecondName: item.SecondName || 'N/A',
                ListType: item.ListType || 'N/A',
                FullName: `${item.FirstName || 'N/A'} ${item.SecondName || 'N/A'}`,
                ThirdName: item.ThirdName || 'N/A',
                FourthName : item.FourthName || 'N/A',
                Designation : item.Designation || 'N/A',
                Nationality : item.Nationality || 'N/A',
                UNListType : item.UNListType || 'N/A',
                ReferenceNumber : item.ReferenceNumber || 'N/A',
                ListedOn : item.ListedOn || 'N/A',
                LastUpdatedDate : item.LastUpdatedDate || 'N/A',
                IndividualAlias : item.IndividualAlias || 'N/A',
                IndividualAddress : item.IndividualAddress || 'N/A',
                Title : item.Title || 'N/A',
                Comments : item.Comments || 'N/A',
                DateOfBirth :item.DateOfBirth || 'N/A',
              }));
              this.error = null;
            }
          } else {
            this.data = [];
            this.error = 'No data available.';
          }
          this.loading = false;
        },
        error: (err) => {
            if (err.status === 404) {
                this.data = []; // Clear previous results
                this.error = 'No data found in either the Terrorist List or the UNSC Consolidated List.'; // Display specific message for 404
              } else {
                this.error = 'An error occurred while fetching data.'; // General error message
              }
              this.loading = false;
        }
      });
  }
  getXmlNodePath(): string {
    if (this.selectedFilter === 'Individuals') {
      return '//INDIVIDUALS/INDIVIDUAL';
    } else if (this.selectedFilter === 'Entities') {
      return '//ENTITIES/ENTITY'; // Adjust if necessary
    } else {
      return '//ENTITIES/ENTITY'; 
    }
  }
}
