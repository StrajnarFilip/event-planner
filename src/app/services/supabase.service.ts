import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly supabaseUrl = 'https://yjbexabxdgxdshiyquxh.supabase.co';
  readonly supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqYmV4YWJ4ZGd4ZHNoaXlxdXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4Mjc0MTgsImV4cCI6MjAxMzQwMzQxOH0.iKW449TNP_XFwdEO5erRBVVkLkd0J-I6yYVLBhuY9rA';

  readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getEvent(eventId: number) {
    return this.supabase
      .from('event')
      .select(
        `
          event_participant(name, joined_at),
          name,
          extra_information
        `,
      )
      .eq('id', eventId);
  }

  participate(eventId: number, name: string) {
    this.supabase
      .from('event_participant')
      .insert({ name: name, event_id: eventId })
      .then(console.log);
  }

  revokeParticipation(eventId: number, name: string) {
    this.supabase
      .from('event_participant')
      .delete()
      .eq('name', name)
      .eq('event_id', eventId)
      .then(console.log);
  }

  listenForChanges(handler: (payload: any) => void) {
    return this.supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'event_participant' },
        handler,
      )
      .subscribe();
  }

  createNewEvent(
    eventName: string,
    eventBeginsAt: Date,
    extraInformation: string,
  ) {
    return this.supabase.from('event').insert({
      name: eventName,
      begins_at: eventBeginsAt,
      extra_information: extraInformation,
    });
  }

  allEvents() {
    return this.supabase.from('event').select('*, event_participant(count)');
  }
}
