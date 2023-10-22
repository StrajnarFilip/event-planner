import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { SearchEventsComponent } from './components/search-events/search-events.component';

const routes: Routes = [
  { path: 'event/:id', component: EventComponent },
  { path: 'new-event', component: NewEventComponent },
  { path: 'search-events', component: SearchEventsComponent },
  { path: '**', redirectTo: '/search-events' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
