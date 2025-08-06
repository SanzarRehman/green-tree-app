import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonChip,
  IonAvatar,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import { AuthService, User } from '../services/auth.service';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonChip,
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    NgIf,
    NgForOf
  ],
})
export class Tab3Page implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      // In a real app, you'd navigate to login page
      console.log('User logged out');
    });
  }
}
