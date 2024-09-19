import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

interface DropdownData {
  ID: number;
  Name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DropDownServiceService {
  private apiUrl = environment.apiUrl;

  private AuthorityUrl = `${this.apiUrl}/DropDownData/Authority`;
  private SalesPersonUrl = `${this.apiUrl}/DropDownData/SalesPersons`;
  private SourceUrl = `${this.apiUrl}/DropDownData/Source`;
  private AreaUrl = `${this.apiUrl}/DropDownData/Area`;
  private StatusUrl = `${this.apiUrl}/DropDownData/Status`;
  private EmiratesUrl = `${this.apiUrl}/DropDownData/Emirates`;
  private CountryUrl = `${this.apiUrl}/DropDownData/Country`;
  private ClientUrl = `${this.apiUrl}/DropDownData/Client`;
  private AssignmentUrl = `${this.apiUrl}/DropDownData/Assignment`;
  private PeriodTypeUrl = `${this.apiUrl}/DropDownData/PeriodType`;
  private CompanyDetailsUrl = `${this.apiUrl}/DropDownData/CompanyDetails`;
  private ClientDetailsUrl = `${this.apiUrl}/DropDownData/ClientDetails`;
  private ELDetailsUrl = `${this.apiUrl}/DropDownData/ELDetails`;
  private AssignmentDetailsUrl = `${this.apiUrl}/DropDownData/AssignmentDetails`;
  private MenuUrl = `${this.apiUrl}/User/Menu`;

  constructor(private http: HttpClient) {}

  getAuthorities(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.AuthorityUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getsalespersons(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.SalesPersonUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getSource(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.SourceUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getArea(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.AreaUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getCountry(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.CountryUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getEmirates(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.EmiratesUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getPeriodTypes(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.PeriodTypeUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }

  getStatus(callback: (data: DropdownData[]) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.StatusUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data: DropdownData[] = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        console.error('Error fetching data:', xhr.statusText);
        callback([]);
      }
    };
    xhr.send();
  }


  getClients(search: string): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('search', search);

    return this.http.get<any>(this.ClientUrl, { params });
  }

  getAssignments(search: string): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('search', search);

    return this.http.get<any>(this.AssignmentUrl, { params });
  }

  getCompanyDetails(): Observable<any> {
    return this.http.get<any>(this.CompanyDetailsUrl);
  }

  getClientDetails(search: string): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(this.ClientDetailsUrl, { params });
  }

  getELDetails(search: string): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(this.ELDetailsUrl, { params });
  }

  getAssignmentDetails(search: string): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(this.AssignmentDetailsUrl, { params });
  }

  getMenuDetails(EmpId: number): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('EmpId', EmpId);
    return this.http.get<any>(this.MenuUrl, { params });
  }
}
