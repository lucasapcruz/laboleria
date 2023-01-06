CREATE TABLE cakes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	price NUMERIC(6,2) NOT NULL,
	image VARCHAR(2000) NOT NULL,
	description TEXT NOT NULL
);

CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	address VARCHAR(150) NOT NULL,
	phone VARCHAR(11) NOT NULL
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	"clientId" INTEGER NOT NULL,
	"cakeId" INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "totalPrice" NUMERIC(7,2) NOT NULL
);

ALTER TABLE orders ADD CONSTRAINT orders_fk0 FOREIGN KEY ("clientId") REFERENCES orders(id);
ALTER TABLE orders ADD CONSTRAINT orders_fk1 FOREIGN KEY ("cakeId") REFERENCES cakes(id);