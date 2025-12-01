-- Inserir 3 usuários
INSERT INTO `User` 
(`username`, `password`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `is_superuser`, `date_joined`) VALUES
('Lin', '123', 'Lin', 'User', 'lin@example.com', 0, 1, 0, NOW()),
('Anna', '123', 'Anna', 'User', 'anna@example.com', 0, 1, 0, NOW()),
('Bob', '123', 'Bob', 'User', 'bob@example.com', 0, 1, 0, NOW());

-- Inserir 3 categorias
INSERT INTO `Category` (`categoryName`) VALUES
('Eletrônicos'),
('Alimentos'),
('Roupas');

-- Inserir 3 produtos
INSERT INTO `Product` 
(`name`, `categoryProduct_id`, `height`, `weight`, `quantity`, `minimum_quantity`, `imageProduct`) VALUES
('Smartphone', 1, 15.0, 0.2, 50, 5, NULL),
('Arroz', 2, 10.0, 1.0, 200, 20, NULL),
('Camiseta', 3, 1.0, 0.3, 100, 10, NULL);

-- Inserir 3 históricos
INSERT INTO `Historic` 
(`responsibleUser_id`, `operation_date`, `typeOperation`, `quantityProduct`, `product_id`, `created_at`) VALUES
(1, NOW(), 'Input', 10, 1, NOW()),
(2, NOW(), 'Output', 5, 2, NOW()),
(3, NOW(), 'Input', 20, 3, NOW());