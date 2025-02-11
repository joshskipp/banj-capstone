CREATE DATABASE  IF NOT EXISTS `qldprojects-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qldprojects-db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qldprojects-db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commodity`
--

DROP TABLE IF EXISTS `commodity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commodity` (
  `id_Commodity` int NOT NULL AUTO_INCREMENT,
  `Commodity_name` varchar(45) DEFAULT NULL,
  `Element` varchar(45) DEFAULT NULL,
  `Units_of_Measure` varchar(45) DEFAULT NULL,
  `Notes` longtext,
  PRIMARY KEY (`id_Commodity`),
  UNIQUE KEY `id_Commodity_UNIQUE` (`id_Commodity`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commodity`
--

LOCK TABLES `commodity` WRITE;
/*!40000 ALTER TABLE `commodity` DISABLE KEYS */;
INSERT INTO `commodity` VALUES (1,'Cobolt battery','Cobolt','million metric tons','Great for batteries'),(2,'Graphite','Carbon','million metric tons','Great for pencil lead, and non toxic');
/*!40000 ALTER TABLE `commodity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id_Project` int NOT NULL AUTO_INCREMENT,
  `Project_name` varchar(45) NOT NULL,
  `Product` varchar(45) DEFAULT NULL,
  `Latitude` decimal(8,6) DEFAULT NULL,
  `Logitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`id_Project`),
  UNIQUE KEY `idProject_UNIQUE` (`id_Project`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'Mine Site One','Grahite pencils',99.662100,12.773200),(2,'Alpha Site Pro','Battery Silicon',12.662100,33.773200);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects-commodities`
--

DROP TABLE IF EXISTS `projects-commodities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects-commodities` (
  `id_project` int NOT NULL,
  `id_commodity` int NOT NULL,
  `isPrimary` tinyint DEFAULT NULL,
  `isSecondary` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_project`,`id_commodity`),
  KEY `id_commodity_idx` (`id_commodity`),
  CONSTRAINT `id_commodity` FOREIGN KEY (`id_commodity`) REFERENCES `commodity` (`id_Commodity`),
  CONSTRAINT `id_project` FOREIGN KEY (`id_project`) REFERENCES `project` (`id_Project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects-commodities`
--

LOCK TABLES `projects-commodities` WRITE;
/*!40000 ALTER TABLE `projects-commodities` DISABLE KEYS */;
INSERT INTO `projects-commodities` VALUES (1,1,1,0);
/*!40000 ALTER TABLE `projects-commodities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11 15:34:09
