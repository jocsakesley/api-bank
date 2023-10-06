

CREATE TABLE public.accounts (
	id serial NOT NULL,
	id_user int8 NULL,
	"number" text NULL,
	agency text NULL,
	balance numeric NULL,
	CONSTRAINT accounts_pkey PRIMARY KEY (id),
	CONSTRAINT "uniqueValues" UNIQUE (number, agency)
);


ALTER TABLE public.accounts ADD CONSTRAINT "accountUser" FOREIGN KEY (id_user) REFERENCES public.users(id);