-- inspired by Rob Conery. He seems like a great person.
-- You should check out his Pluralsight courses and buy red four.
-- This table should be split into multiple tables.
-- Move fast and break things.
drop table if exists users;
create table users(
	id serial primary key,
  "group" "e_group" NOT NULL DEFAULT 'user',
	user_id varchar(100) not null,
	created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
	email varchar(255) not null,
	ip inet not null default '127.0.0.1',
	country_code varchar(2) not null default 'US',
	description varchar(255),
	billing_address jsonb,
	terms_accepted boolean default false not null,
	processor varchar(20) not null default 'stripe',
	token jsonb,
	payment_details jsonb,
  stripe_plan varchar not null default 'free',
  stripe_subscription_id varchar,
  stripe_customer_id varchar,
  stripe_status varchar,
  card_last4 int

)
