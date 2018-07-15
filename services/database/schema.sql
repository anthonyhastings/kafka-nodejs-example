CREATE TABLE sales (
  id          serial,
  uuid        uuid,
  total       decimal(7, 2) DEFAULT 0.0,
  sale_date   timestamp with time zone NOT NULL,
  created_at  timestamp with time zone NOT NULL DEFAULT NOW()
);