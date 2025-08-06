import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TreeSpecies {
  id: number;
  name: string;
  scientificName: string;
  co2AbsorptionPerYear: number;
  matureHeight: number;
  growthRate: string;
  description: string;
  imageUrl: string;
}

export interface PlantedTree {
  id: string;
  treeSpeciesId: number;
  plantingDate: string;
  latitude: number;
  longitude: number;
  address?: string;
  notes?: string;
  photos: string[];
  userId: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  
  // Dummy tree species data
  private dummyTreeSpecies: TreeSpecies[] = [
    {
      id: 1,
      name: 'Neem',
      scientificName: 'Azadirachta indica',
      co2AbsorptionPerYear: 30,
      matureHeight: 20,
      growthRate: 'Fast',
      description: 'Medicinal and air purifying tree native to India',
      imageUrl: 'assets/images/neem.jpg'
    },
    {
      id: 2,
      name: 'Banyan',
      scientificName: 'Ficus benghalensis',
      co2AbsorptionPerYear: 80,
      matureHeight: 25,
      growthRate: 'Medium',
      description: 'National tree of India, provides extensive shade',
      imageUrl: 'assets/images/banyan.jpg'
    },
    {
      id: 3,
      name: 'Mango',
      scientificName: 'Mangifera indica',
      co2AbsorptionPerYear: 45,
      matureHeight: 18,
      growthRate: 'Medium',
      description: 'Fruit-bearing tree with excellent carbon absorption',
      imageUrl: 'assets/images/mango.jpg'
    },
    {
      id: 4,
      name: 'Oak',
      scientificName: 'Quercus robur',
      co2AbsorptionPerYear: 60,
      matureHeight: 30,
      growthRate: 'Slow',
      description: 'Long-lived hardwood tree, excellent for wildlife',
      imageUrl: 'assets/images/oak.jpg'
    },
    {
      id: 5,
      name: 'Pine',
      scientificName: 'Pinus sylvestris',
      co2AbsorptionPerYear: 40,
      matureHeight: 25,
      growthRate: 'Fast',
      description: 'Evergreen conifer, excellent air purifier',
      imageUrl: 'assets/images/pine.jpg'
    }
  ];

  // Dummy planted trees data
  private dummyPlantedTrees: PlantedTree[] = [
    {
      id: '1',
      treeSpeciesId: 1,
      plantingDate: '2024-01-15',
      latitude: 23.8103,
      longitude: 90.4125,
      address: 'Dhaka, Bangladesh',
      notes: 'First tree planted in the new year!',
      photos: ['photo1.jpg'],
      userId: '123',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      treeSpeciesId: 2,
      plantingDate: '2024-02-20',
      latitude: 23.7503,
      longitude: 90.3925,
      address: 'Gulshan, Dhaka',
      notes: 'Community planting event',
      photos: ['photo2.jpg', 'photo3.jpg'],
      userId: '123',
      createdAt: '2024-02-20T14:30:00Z'
    }
  ];

  constructor() { }

  getTreeSpecies(): Observable<TreeSpecies[]> {
    return of(this.dummyTreeSpecies).pipe(delay(500));
  }

  getTreeSpeciesById(id: number): Observable<TreeSpecies | undefined> {
    const species = this.dummyTreeSpecies.find(s => s.id === id);
    return of(species).pipe(delay(300));
  }

  plantTree(treeData: Partial<PlantedTree>): Observable<PlantedTree> {
    const newTree: PlantedTree = {
      id: Date.now().toString(),
      treeSpeciesId: treeData.treeSpeciesId!,
      plantingDate: treeData.plantingDate!,
      latitude: treeData.latitude!,
      longitude: treeData.longitude!,
      address: treeData.address,
      notes: treeData.notes,
      photos: treeData.photos || [],
      userId: '123',
      createdAt: new Date().toISOString()
    };
    
    this.dummyPlantedTrees.push(newTree);
    return of(newTree).pipe(delay(1000));
  }

  getUserTrees(userId: string): Observable<PlantedTree[]> {
    const userTrees = this.dummyPlantedTrees.filter(tree => tree.userId === userId);
    return of(userTrees).pipe(delay(800));
  }

  getAllTrees(): Observable<PlantedTree[]> {
    return of(this.dummyPlantedTrees).pipe(delay(600));
  }

  getTreeStats(userId: string): Observable<any> {
    const userTrees = this.dummyPlantedTrees.filter(tree => tree.userId === userId);
    const totalCO2Saved = userTrees.reduce((sum, tree) => {
      const species = this.dummyTreeSpecies.find(s => s.id === tree.treeSpeciesId);
      return sum + (species?.co2AbsorptionPerYear || 0);
    }, 0);

    const stats = {
      totalTrees: userTrees.length,
      totalCO2Saved,
      certificates: Math.floor(userTrees.length / 5),
      monthlyData: [
        { month: 'Jan', count: 2 },
        { month: 'Feb', count: 5 },
        { month: 'Mar', count: 8 },
        { month: 'Apr', count: 12 },
        { month: 'May', count: 20 },
        { month: 'Jun', count: 24 }
      ]
    };

    return of(stats).pipe(delay(400));
  }
}