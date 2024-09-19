import { DebugElement, Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse , HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { catchError,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class DataServices {
  private LeadSubmitUrl = `${environment.apiUrl}/Lead/Submit`;  
  private LeadListUrl = `${environment.apiUrl}/Lead`;  
  private ScreeningUNSCUrl = `${environment.apiUrl}/Screening/getUNSCData`;  
  private AddAssignmentUrl = `${environment.apiUrl}/Assignment/Submit`;  
  private AssignmentListUrl = `${environment.apiUrl}/Assignment`;  
  private DeleteAssignmentUrl = `${environment.apiUrl}/Assignment/Delete`;  
  private DeleteELUrl = `${environment.apiUrl}/Assignment/DeleteEL`;  
  private ConfirmELUrl = `${environment.apiUrl}/Assignment/ConfirmEL`;  
  private CreateELUrl = `${environment.apiUrl}/Assignment/CreateEL`;  
  private ELListUrl = `${environment.apiUrl}/Assignment`;  
  private ServiceubmitUrl = `${environment.apiUrl}/Assignment/SubmitService`;  
  private GetServiceUrl = `${environment.apiUrl}/DropDownData/ServiceDetails`;  
  private GetLeadUrl = `${environment.apiUrl}/DropDownData/LeadDetails`;  
  private GetAssignHistoryUrl = `${environment.apiUrl}/Assignment/AssignHistory`;
  private GetRemarksHistoryUrl = `${environment.apiUrl}/Assignment/RemarksHistory`;
  private SaveSignatureUrl = `${environment.apiUrl}/FileUpload/upload`;  
  private SaveAssignemntUrl = `${environment.apiUrl}/Assignment`;  

  constructor(private http: HttpClient) {}

  submitLead(leadData: any): Observable<any> {
    debugger
    return this.http.post<any>(this.LeadSubmitUrl, leadData).pipe(
        catchError(this.handleError<any>('submitLead'))
    );
  }

  submitService(serviceData: any): Observable<any> {
    debugger
    return this.http.post<any>(this.ServiceubmitUrl, serviceData).pipe(
      catchError(this.handleError<any>('submitService'))
    );
  }
  
  

  submitAssignment(AssignmentData: any): Observable<any> {
    debugger
    return this.http.post<any>(this.AddAssignmentUrl, AssignmentData).pipe(
        catchError(this.handleError<any>('submitAssignment'))
    );
  }

  createEL(ids: string[], clientId: string): Observable<any> {
    debugger
    const idString = ids.join(',');
    return this.http.post<any>(this.CreateELUrl, { id: idString, clientId: clientId }, {
      headers: { 'Content-Type': 'application/json' } // Ensure content type is JSON
    }).pipe(
      catchError(this.handleError<any>('createEL'))
    );
}

saveAssignment(data: any): Observable<any> {
  debugger
  return this.http.post<any>(`${this.SaveAssignemntUrl}/SaveAssigner`, data);
}
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getLeads(page: number, pageSize: number, params: any[], search: string,sortColumnIndex: number,
    sortDirection: string): Observable<any> {
    debugger
    let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('search', search)
    .set('sortColumnIndex', sortColumnIndex.toString())
    .set('sortDirection', sortDirection);
   
    params.forEach(param => {
      if (param.value !== null && param.value !== undefined) {
        httpParams = httpParams.set(param.param, param.value);
      }
    });

    return this.http.get<any[]>(`${this.LeadListUrl}/LeadList`, { params: httpParams });
  }

  getAssignments(page: number, pageSize: number, params: any[], search: string,sortColumnIndex: number,
    sortDirection: string): Observable<any> {
    debugger
    let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('search', search)
    .set('sortColumnIndex', sortColumnIndex.toString())
    .set('sortDirection', sortDirection);
   
    params.forEach(param => {
      if (param.value !== null && param.value !== undefined) {
        httpParams = httpParams.set(param.param, param.value);
      }
    });

    return this.http.get<any[]>(`${this.AssignmentListUrl}/AssignmentList`, { params: httpParams });
  }

  getAssignmentsALL(page: number, pageSize: number, params: any[], search: string,sortColumnIndex: number,
    sortDirection: string): Observable<any> {
    debugger
    let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('search', search)
    .set('sortColumnIndex', sortColumnIndex.toString())
    .set('sortDirection', sortDirection);
   
    params.forEach(param => {
      if (param.value !== null && param.value !== undefined) {
        httpParams = httpParams.set(param.param, param.value);
      }
    });

    return this.http.get<any[]>(`${this.AssignmentListUrl}/AssignmentListALL`, { params: httpParams });
  }
  getEngagementLetter(page: number, pageSize: number, params: any[], search: string,sortColumnIndex: number,
    sortDirection: string): Observable<any> {
    debugger
    let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('search', search)
    .set('sortColumnIndex', sortColumnIndex.toString())
    .set('sortDirection', sortDirection);
   
    params.forEach(param => {
      if (param.value !== null && param.value !== undefined) {
        httpParams = httpParams.set(param.param, param.value);
      }
    });

    return this.http.get<any[]>(`${this.ELListUrl}/ELList`, { params: httpParams });
  }

  getEngagementLetterALL(page: number, pageSize: number, params: any[], search: string,sortColumnIndex: number,
    sortDirection: string): Observable<any> {
    debugger
    let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString())
    .set('search', search)
    .set('sortColumnIndex', sortColumnIndex.toString())
    .set('sortDirection', sortDirection);
   
    params.forEach(param => {
      if (param.value !== null && param.value !== undefined) {
        httpParams = httpParams.set(param.param, param.value);
      }
    });

    return this.http.get<any[]>(`${this.ELListUrl}/ELListALL`, { params: httpParams });
  }

  deleteAssignment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.DeleteAssignmentUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deleteAssignment'))
    );
  }

  deleteEL(id: number): Observable<any> {
    return this.http.delete<any>(`${this.DeleteELUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deleteEL'))
    );
  }

  ConfirmEL(id: number): Observable<any> {
    return this.http.post<any>(`${this.ConfirmELUrl}/${id}`, {}).pipe( // You might want to send an empty body if nothing else is needed.
      catchError(this.handleError<any>('ConfirmEL'))
    );
  }

  getServiceById(id: number): Observable<any> {
    debugger
    const url = `${this.GetServiceUrl}/${id}`; // Construct URL
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('getServiceById'))
    );
  }

  getLeadById(id: number): Observable<any> {
    debugger
    const url = `${this.GetLeadUrl}/${id}`; // Construct URL
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('getLeadById'))
    );
  }
 
  getAssignmenttById(id: number): Observable<any> {
    debugger
    const url = `${this.GetAssignHistoryUrl}/${id}`; // Construct URL
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('getAssignmenttById'))
    );
  }

  getRemarksById(id: number): Observable<any> {
    debugger
    const url = `${this.GetRemarksHistoryUrl}/${id}`; // Construct URL
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('getRemarksById'))
    );
  }

  getUNSCData(
    xmlnodepath: string,
    name?: string,
    id?: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    listType?: string,
  ): Observable<any[]> {
    debugger
    let params = new HttpParams().set('xmlnodepath', xmlnodepath);

    if (name) params = params.set('name', name);
    if (id) params = params.set('id', id);
    if (address) params = params.set('address', address);
    if (city) params = params.set('city', city);
    if (state) params = params.set('state', state);
    if (country) params = params.set('country', country);
    if (listType) params = params.set('listType', listType);
    return this.http.get<any[]>(this.ScreeningUNSCUrl, { params });
  }


  // saveSignature(base64Signature: string): Observable<any> {
  //   const body = { File: base64Signature };
  //   return this.http.post(this.SaveSignatureUrl, body); 
  // }
  saveSignature(payload: { File: string, autoid: string | null, clientid: string | null }): Observable<any> {
    return this.http.post(this.SaveSignatureUrl, payload);
  }
}
