CREATE TABLE public.products (
	"productId" serial4 NOT NULL,
	"productName" varchar(255) NOT NULL,
	"productDescription" varchar(255) NOT NULL,
	price numeric(5, 2) NULL,
	"productCategory" varchar(255) NOT NULL,
	CONSTRAINT products_pkey PRIMARY KEY ("productId")
);