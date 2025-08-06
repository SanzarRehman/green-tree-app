import {Component, EnvironmentInjector, inject} from '@angular/core';
import {IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {ellipse, homeOutline, square, triangle,leafOutline, notificationsOutline, personOutline} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({triangle, ellipse, square, homeOutline, leafOutline, notificationsOutline, personOutline});
  }
}
