import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicationServiceService {
  baseUrl: any = `${environment.apiUrl}/care-units`;
  constructor(private http: HttpClient) {}
  newMedication(careUnit: any, medication: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${careUnit}/medications`,
      medication
    );
  }
  getMedications(careUnit: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${careUnit}/medications`);
  }
}
