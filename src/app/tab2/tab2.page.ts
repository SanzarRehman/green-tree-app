import {Component} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {TreePlatingFormComponent} from "../tree-plating-form/tree-plating-form.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, TreePlatingFormComponent, IonButtons]
})
export class Tab2Page {

  constructor() {
  }

}
