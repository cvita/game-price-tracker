CREATE TABLE price_history (
  game_id           char(36) not null,
  sale_general      boolean not null,
  sale_ps_plus      boolean not null,
  discount_general  INT not null,
  discount_ps_plus  INT not null,
  price_general     real not null,
  price_ps_plus     real not null,
  price_regular     real not null,
  on_sale           boolean not null,
  date              date DEFAULT current_date UNIQUE
);

CREATE TABLE price_alerts (
  game_id           char(36) not null,
  email             text not null,
  price             real not null,
  created           date DEFAULT current_date,
  expires           date DEFAULT to_timestamp( (extract(epoch from now()) + 10886400) ),
  alert_id          serial UNIQUE,
  PRIMARY KEY(game_id, email)
);

CREATE TABLE users (
  email             text not null UNIQUE,
  on_blacklist      boolean not null,
  user_since        date DEFAULT current_date
);
