import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { TranslationService } from '../../services/translation';
import { PageNavigation } from '../../shared/page-navigation/page-navigation';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-careers',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatChipsModule,
    PageNavigation
  ],
  templateUrl: './careers.html',
  styleUrl: './careers.scss'
})
export class CareersComponent {
  applicationForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  allowedFileTypes = ['.pdf', '.doc', '.docx'];
  maxFileSize = 5 * 1024 * 1024; // 5MB
  isSubmitting = false;

  positions = [
    { value: 'baker', label: 'Panadero/Repostero' },
    { value: 'cook', label: 'Cocinero' },
    { value: 'sales', label: 'Vendedor' },
    { value: 'delivery', label: 'Repartidor' },
    { value: 'catering', label: 'Coordinador de Catering' },
    { value: 'other', label: 'Otro' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    public translate: TranslationService
  ) {
    this.applicationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      position: ['', Validators.required],
      experience: ['', [Validators.required, Validators.minLength(10)]],
      motivation: ['', [Validators.required, Validators.minLength(20)]],
      availability: ['', Validators.required]
    });
  }

  t(key: string): string {
    return this.translate.get(key);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      // Validar tipo de archivo
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!this.allowedFileTypes.includes(fileExtension)) {
        this.snackBar.open(
          this.translate.get('careers.form.fileTypeError'),
          this.translate.get('careers.form.close'),
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        return;
      }

      // Validar tamaño
      if (file.size > this.maxFileSize) {
        this.snackBar.open(
          this.translate.get('careers.form.fileSizeError'),
          this.translate.get('careers.form.close'),
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        return;
      }

      this.selectedFile = file;
      this.selectedFileName = file.name;
      
      this.snackBar.open(
        `${this.translate.get('careers.form.cvUploaded')}: ${file.name}`,
        this.translate.get('careers.form.ok'),
        { duration: 3000, panelClass: ['success-snackbar'] }
      );
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    // Reset file input
    const fileInput = document.getElementById('cvUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('cvUpload');
    fileInput?.click();
  }

  async onSubmit(): Promise<void> {
    if (this.applicationForm.invalid) {
      this.snackBar.open(
        this.translate.get('careers.form.errorIncomplete'),
        this.translate.get('careers.form.close'),
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      return;
    }

    if (!this.selectedFile) {
      this.snackBar.open(
        this.translate.get('careers.form.cvRequired'),
        this.translate.get('careers.form.close'),
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      return;
    }

    this.isSubmitting = true;

    try {
      // Preparar datos para enviar
      const formData = new FormData();
      formData.append('fullName', this.applicationForm.value.fullName);
      formData.append('email', this.applicationForm.value.email);
      formData.append('phone', this.applicationForm.value.phone);
      formData.append('position', this.applicationForm.value.position);
      formData.append('experience', this.applicationForm.value.experience);
      formData.append('motivation', this.applicationForm.value.motivation);
      formData.append('availability', this.applicationForm.value.availability);
      formData.append('cv', this.selectedFile);
      formData.append('to', 'admin@bitsmove.com');

      // Aquí simularemos el envío (en producción, conectarías con tu backend)
      await this.sendEmail(formData);

      this.snackBar.open(
        this.translate.get('careers.form.success'),
        this.translate.get('careers.form.ok'),
        { duration: 5000, panelClass: ['success-snackbar'] }
      );

      // Resetear formulario
      this.applicationForm.reset();
      this.removeFile();

    } catch (error) {
      console.error('Error al enviar la aplicación:', error);
      this.snackBar.open(
        this.translate.get('careers.form.error'),
        this.translate.get('careers.form.close'),
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
    } finally {
      this.isSubmitting = false;
    }
  }

  private async sendEmail(formData: FormData): Promise<void> {
    // Simulación de envío - En producción, reemplaza esto con tu endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Datos de aplicación:', {
          fullName: formData.get('fullName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          position: formData.get('position'),
          cv: formData.get('cv')
        });
        resolve();
        
        // Para producción, descomenta esto y crea tu endpoint:
        /*
        this.http.post('YOUR_BACKEND_URL/api/careers/apply', formData)
          .subscribe({
            next: () => resolve(),
            error: (err) => reject(err)
          });
        */
      }, 1000);
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.applicationForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return this.translate.get('careers.validation.required');
    }
    if (field?.hasError('email')) {
      return this.translate.get('careers.validation.email');
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return this.translate.get('careers.validation.minlength').replace('{{length}}', minLength);
    }
    if (field?.hasError('pattern')) {
      return this.translate.get('careers.validation.phonePattern');
    }
    
    return '';
  }
}