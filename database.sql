
create TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	artikul VARCHAR(255)
);


create TABLE buyer (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	artikul VARCHAR(255)
);


create TABLE orders (
	id SERIAL PRIMARY KEY,
	buyer_id INTEGER,
	FOREIGN KEY (buyer_id) REFERENCES buyer (id),
	products_id INTEGER,
	FOREIGN KEY (products_id) REFERENCES products (id)
);
