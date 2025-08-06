import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonRow,
  IonTitle,
  IonToolbar,
  IonChip
} from '@ionic/angular/standalone';
import {Chart} from 'chart.js/auto';
import { TreeService } from '../services/tree.service';
import { AuthService, User } from '../services/auth.service';
import { NgIf, NgForOf } from '@angular/common';

declare const google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonIcon, IonList, IonItem, IonLabel, IonChip, NgIf, NgForOf],
})
export class Tab1Page implements AfterViewInit, OnInit {
  currentUser: User | null = null;
  stats: any = {};
  plantingData: any[] = [];

  constructor(
    private treeService: TreeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  ngAfterViewInit() {
    this.loadMap();
    // Delay chart creation to ensure data is loaded
    setTimeout(() => {
      this.createChart();
    }, 1000);
  }

  loadUserData() {
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      // Load user statistics
      this.treeService.getTreeStats(this.currentUser.id).subscribe(stats => {
        this.stats = stats;
        this.createChart(); // Recreate chart with real data
      });

      // Load planted trees for map
      this.treeService.getUserTrees(this.currentUser.id).subscribe(trees => {
        this.plantingData = trees.map(tree => ({
          lat: tree.latitude,
          lng: tree.longitude,
          date: tree.plantingDate,
          address: tree.address || 'Unknown location'
        }));
        this.loadMap(); // Recreate map with real data
      });
    }
  }

  createChart() {
    const canvas = document.getElementById('treeChart') as HTMLCanvasElement;
    if (canvas && this.stats.monthlyData) {
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: this.stats.monthlyData.map((d: any) => d.month),
          datasets: [{
            label: 'Trees Planted',
            data: this.stats.monthlyData.map((d: any) => d.count),
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: '#2e7d32',
            borderWidth: 2,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  loadMap() {
    if (typeof google === 'undefined') {
      console.warn('Google Maps not loaded yet');
      return;
    }

    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 23.8103, lng: 90.4125 },
      zoom: 11,
      styles: [
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{"color": "#f0f9f2"}]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{"color": "#4acd80"}]
        }
      ],
    });

    const today = new Date();

    for (const tree of this.plantingData) {
      const plantedDate = new Date(tree.date);
      const ageInDays = Math.floor((today.getTime() - plantedDate.getTime()) / (1000 * 3600 * 24));

      let color = '';
      if (ageInDays > 730) {
        color = 'darkgreen'; // oldest
      } else if (ageInDays > 365) {
        color = 'green'; // older
      } else {
        color = '#76ff03'; // newest
      }

      new google.maps.Marker({
        position: { lat: tree.lat, lng: tree.lng },
        map,
        title: `Planted: ${tree.date} at ${tree.address}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: color,
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
          scale: 10,
        }
      });
    }
  }
}

