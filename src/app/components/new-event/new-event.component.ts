import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
})
export class NewEventComponent {
  eventName?: string;
  eventBeginsAt?: Date;
  extraInformation?: string;

  constructor(
    private supabase: SupabaseService,
    private router: Router,
  ) {}

  createEvent() {
    if (this.eventName && this.eventBeginsAt) {
      this.supabase
        .createNewEvent(
          this.eventName,
          this.eventBeginsAt,
          this.extraInformation ?? '',
        )
        .select()
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const createdEventId: number = response.data[0].id;
            this.router.navigate(['event', createdEventId]);
          }
        });
    }
  }
}
