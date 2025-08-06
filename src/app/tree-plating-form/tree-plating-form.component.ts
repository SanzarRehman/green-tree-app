import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  IonToast
} from "@ionic/angular/standalone";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { TreeService, TreeSpecies } from '../services/tree.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tree-plating-form',
  templateUrl: './tree-plating-form.component.html',
  styleUrls: ['./tree-plating-form.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonChip,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonInput,
    IonButton,
    IonIcon,
    IonTextarea,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonSpinner,
    RouterLink,
    NgIf,
    NgForOf,
    IonToast
  ]
})
export class TreePlatingFormComponent implements OnInit {

  plantingForm: FormGroup;
  isLoading = false;
  showToast = false;
  toastMessage = '';

  treeSpecies: TreeSpecies[] = [];
  selectedSpecies: TreeSpecies | null = null;

  capturedPhotos: any[] = [];

  @ViewChild('fileInput', {static: false}) fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private treeService: TreeService,
    private authService: AuthService
  ) {
    this.plantingForm = this.fb.group({
      treeSpeciesId: [null, Validators.required],
      plantingDate: [new Date().toISOString(), Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      address: [''],
      notes: [''],
    });
  }

  ngOnInit() {
    this.loadTreeSpecies();
    this.useCurrentLocation(); // Auto-populate with dummy location
  }

  loadTreeSpecies() {
    this.treeService.getTreeSpecies().subscribe(species => {
      this.treeSpecies = species;
    });
  }

  onSpeciesChange(value: any) {
    this.selectedSpecies = this.treeSpecies.find(s => s.id === value) || null;
  }

  onSubmit() {
    if (this.plantingForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      const formData = {
        ...this.plantingForm.value,
        photos: this.capturedPhotos.map(p => p.url),
        userId: this.authService.getCurrentUser()?.id
      };

      this.treeService.plantTree(formData).subscribe({
        next: (result) => {
          this.isLoading = false;
          this.toastMessage = '🌱 Tree planted successfully! Your contribution to the environment has been recorded.';
          this.showToast = true;
          this.resetForm();
        },
        error: (error) => {
          this.isLoading = false;
          this.toastMessage = '❌ Failed to record tree planting. Please try again.';
          this.showToast = true;
        }
      });
    }
  }

  useCurrentLocation() {
    // Simulate getting GPS location with dummy coordinates (Dhaka, Bangladesh)
    this.plantingForm.patchValue({
      latitude: 23.8103 + (Math.random() - 0.5) * 0.1, // Add some randomness
      longitude: 90.4125 + (Math.random() - 0.5) * 0.1,
      address: 'Dhaka, Bangladesh'
    });
    
    this.toastMessage = '📍 Location captured successfully!';
    this.showToast = true;
  }

  captureMultiplePhotos() {
    // Simulate capturing 3 photos
    for (let i = 0; i < 3; i++) {
      this.addDummyPhoto(`Tree Photo ${this.capturedPhotos.length + 1}`);
    }
    this.toastMessage = '📸 3 photos captured successfully!';
    this.showToast = true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.capturedPhotos.push({
            url: e.target?.result,
            name: file.name,
            file: file
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removePhoto(index: number) {
    this.capturedPhotos.splice(index, 1);
  }

  capturePhoto() {
    this.addDummyPhoto(`Tree Photo ${this.capturedPhotos.length + 1}`);
    this.toastMessage = '📸 Photo captured successfully!';
    this.showToast = true;
  }

  private addDummyPhoto(name: string) {
    // Create a dummy photo with tree icon
    this.capturedPhotos.push({
      url: 'assets/icon/tree-icon.png',
      name: name,
      timestamp: new Date().toISOString()
    });
  }

  private resetForm() {
    this.plantingForm.reset({
      treeSpeciesId: null,
      plantingDate: new Date().toISOString(),
      latitude: null,
      longitude: null,
      address: '',
      notes: '',
    });
    this.selectedSpecies = null;
    this.capturedPhotos = [];
  }
}
