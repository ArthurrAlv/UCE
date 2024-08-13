-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Ago-2024 às 21:10
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ecommerce`
--

--
-- Extraindo dados da tabela `carrinhos`
--

INSERT INTO `carrinhos` (`id`, `cliente_id`, `produto_id`, `quantidade`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, '2024-08-13 17:08:53', '2024-08-13 18:40:22'),
(2, 1, 2, 2, '2024-08-13 17:09:06', '2024-08-13 17:09:28');

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'cliente', 'cliente@gmail.com', '$2b$10$DCN9vGzLfwEri.CHcKJbZOluDkYVc7AlOcVq3nxnYBAtqC7DRSR1G');

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `descricao`, `preco`, `vendedor_id`, `estoque`, `createdAt`, `updatedAt`) VALUES
(1, 'produto 1', 'descrição', 20.90, 1, 5, '2024-08-13 17:07:45', '2024-08-13 18:40:22'),
(2, 'produto 2', 'descrição', 2.92, 1, 1, '2024-08-13 17:08:18', '2024-08-13 17:09:28'),
(3, 'produto x', 'descrição', 12.90, 2, 20, '2024-08-13 17:14:39', '2024-08-13 18:36:49');

--
-- Extraindo dados da tabela `vendedores`
--

INSERT INTO `vendedores` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'vendedor', 'vendedor@gmail.com', '$2b$10$AtNzHq/uHFDkUI2a.XmatO50BFw5LRh9qz4WyATEkkQhZTWr3hm1O'),
(2, 'vendedor 2', 'vendedor2@gmail.com', '$2b$10$CViR3Vbacx6qbWHZy6gmNuzjBBNShgKUh0xM0dNCmPIAJRI380ZsC');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
