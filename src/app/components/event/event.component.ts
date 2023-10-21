import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  eventId?: number;
  userName?: string;
  eventName?: string;
  eventInformation?: string;
  participants?: { name: string; joined_at: string }[];
  displayedColumns: string[] = ['name', 'joined_at'];

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
  ) {}

  get isParticipating() {
    if (this.participants) {
      return (
        this.participants.find(
          (participant) => participant.name == this.userName,
        ) !== undefined
      );
    }

    return false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((currentParams) => {
      this.eventId = currentParams['id'];
      this.refreshEvent();

      this.supabase.listenForChanges((payload) => {
        console.log('Change detected');
        this.refreshEvent();
      });
    });
  }

  refreshEvent() {
    if (this.eventId) {
      this.supabase.getEvent(this.eventId).then((response) => {
        if (response.error == null) {
          console.log(response.data[0]);
          this.eventName = response.data[0].name;
          this.eventInformation = response.data[0].extra_information;
          this.participants = response.data[0].event_participant;
        }
      });
    }
  }

  toggleJoined() {
    if (this.eventId && this.userName) {
      if (this.isParticipating) {
        this.supabase.revokeParticipation(this.eventId, this.userName);
      } else {
        this.supabase.participate(this.eventId, this.userName);
      }
    }
  }
}
