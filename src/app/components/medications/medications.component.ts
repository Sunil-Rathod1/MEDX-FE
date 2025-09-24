import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../sidebar/home.component';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CareunitServiceService } from '../../service/careunit-service.service';
import { MedicationServiceService } from '../../service/medication-service.service';
interface MedicationEntry {
  medicationName: string;
  careUnitName: string;
}
@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [HomeComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css'],
})
export class MedicationsComponent implements OnInit {
  medicationsArray: MedicationEntry[] = [];
  careUnits: any[] = [];
  medicationForm: FormGroup;
  isMedicationOpen: boolean = false;

  isEditMode: boolean = false;
  editIndex: number | null = null;

  successMsg: string = '';
  errorMsg: string = '';
  careUnit: any[] = [];
  selectedCareUnit: any;

  constructor(
    private fb: FormBuilder,
    private careUnitSerive: CareunitServiceService,
    private medicationService: MedicationServiceService
  ) {
    this.medicationForm = this.fb.group({
      medicationName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.careUnitSerive.getAllCareUnits().subscribe({
      next: (res) => {
        this.careUnit = res;
        this.selectedCareUnit = this.careUnit[0]._id;
        console.log('Selected Care Unit : ', this.selectedCareUnit);
        console.log(res);
        this.getMedications();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMedications() {
    this.medicationService.getMedications(this.selectedCareUnit).subscribe({
      next: (res) => {
        console.log(res);
        this.medicationsArray = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCareUnitChange(id: any) {
    this.selectedCareUnit = id.target.value;
    this.getMedications();
  }

  openMedicationPopup() {
    this.isEditMode = false;
    this.editIndex = null;
    this.isMedicationOpen = true;
    this.medicationForm.reset({ careUnitName: '' });
  }

  closeMedicationPopup() {
    this.isMedicationOpen = false;
  }

  onMedicationSubmit() {
    if (this.medicationForm.valid) {
      this.medicationService
        .newMedication(this.selectedCareUnit, this.medicationForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.getMedications();
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.closeMedicationPopup();
    } else {
      this.showError('⚠️ Please fill in all fields!');
    }
  }

  onEdit(index: number) {
    this.isEditMode = true;
    this.editIndex = index;
    const medicationToEdit = this.medicationsArray[index];

    this.medicationForm.patchValue({
      medicationName: medicationToEdit.medicationName,
      careUnitName: medicationToEdit.careUnitName,
    });

    this.isMedicationOpen = true;
  }

  onDelete(medicationToDelete: MedicationEntry) {
    this.medicationsArray = this.medicationsArray.filter(
      (med) => med !== medicationToDelete
    );
    localStorage.setItem('medications', JSON.stringify(this.medicationsArray));
    this.showError('🗑️ Medication deleted successfully!');
  }
  deleteMedicationsByCareUnit(careUnitName: string) {
    const beforeCount = this.medicationsArray.length;
    this.medicationsArray = this.medicationsArray.filter(
      (med) => med.careUnitName !== careUnitName
    );

    if (this.medicationsArray.length !== beforeCount) {
      localStorage.setItem(
        'medications',
        JSON.stringify(this.medicationsArray)
      );
      this.showError(
        `🗑️ All medications for Care Unit "${careUnitName}" deleted!`
      );
    }
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    setTimeout(() => (this.successMsg = ''), 3000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => (this.errorMsg = ''), 3000);
  }
}
