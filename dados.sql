-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/08/2024 às 17:23
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

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
-- Despejando dados para a tabela `carrinhos`
--

INSERT INTO `carrinhos` (`id`, `cliente_id`, `produto_id`, `quantidade`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, '2024-08-13 14:46:07', '2024-08-13 15:19:31');

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'cliente', 'cliente@gmail.com', '$2b$10$rYYNRJRNmL20eng8QFkiGOVygj2tj7Y7nOKIRb6jjmethkzczv3hu');

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `descricao`, `preco`, `vendedor_id`, `estoque`, `createdAt`, `updatedAt`) VALUES
(1, 'produto 1', 'descrição', 2.98, 1, 3, '2024-08-13 14:46:00', '2024-08-13 15:19:31');

--
-- Despejando dados para a tabela `vendedores`
--

INSERT INTO `vendedores` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'vendedor', 'vendedor@gmail.com', '$2b$10$LlxAD7TVPQClpiqW8c09me6RrfswJgDzTvLUIATfruCnykyTFBvGi');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
