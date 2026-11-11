create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  pass_hash text not null,
  created_at timestamptz not null default now()
);
create table if not exists progress (
  user_id uuid references users(id) on delete cascade,
  item text not null,
  done_at timestamptz not null default now(),
  primary key (user_id, item)
);
create table if not exists certificates (
  id text primary key,
  user_id uuid references users(id) on delete cascade,
  course text not null,
  name text not null,
  issued_at timestamptz not null default now(),
  unique (user_id, course)
);
