import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.scss'],
})
export class SearchEventsComponent implements OnInit {
  events?: any[];
  displayedColumns = ['name', 'published_at', 'begins_at'];

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.allEvents().then((response) => {
      console.log(response);
      if (response.data !== null) {
        this.events = response.data;
      }
    });
  }
}
