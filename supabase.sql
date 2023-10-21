drop table if exists
  event cascade;

drop table if exists
  event_participant cascade;

create table
  event (
    id bigserial primary key,
    published_at timestamp with time zone default now(),
    begins_at timestamp not null,
    extra_information text,
    name varchar(100)
  );

create table
  event_participant (
    id bigserial primary key,
    event_id bigint references event (id),
    name varchar(100) unique,
    joined_at timestamp with time zone default now()
  );

alter publication supabase_realtime
add table event, event_participant;