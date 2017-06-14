CREATE DATABASE  IF NOT EXISTS `teacherscamp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `teacherscamp`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: teacherscamp
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conference_halls`
--

DROP TABLE IF EXISTS `conference_halls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conference_halls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `in_deped` int(11) NOT NULL,
  `in_nondeped` int(11) NOT NULL,
  `out_deped` int(11) NOT NULL,
  `out_nondeped` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_halls`
--

LOCK TABLES `conference_halls` WRITE;
/*!40000 ALTER TABLE `conference_halls` DISABLE KEYS */;
INSERT INTO `conference_halls` VALUES (1,'Benitez Hall','available',4000,4500,5000,5500),(2,'Carlos P. Romulo','available',1800,2200,2800,3300),(3,'Quezon Hall Main','available',2200,2700,3200,3700),(4,'Quezon Hall Down','available',1700,2200,2700,3200),(5,'Quirino Conference Hall','available',2200,2700,2700,3200),(6,'Quirino Canteen','available',1100,1200,1600,1800),(7,'Oring-ao Hall','available',900,1100,1300,1600),(8,'Audio Visual Room','available',1300,1600,1600,2100),(9,'Pages Conference Hall','available',1350,1650,1650,2150),(10,'Albert Hall','available',1000,1000,1100,1100);
/*!40000 ALTER TABLE `conference_halls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cottages_guesthouses`
--

DROP TABLE IF EXISTS `cottages_guesthouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cottages_guesthouses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` enum('cottage','guesthouse','textbookhouse') NOT NULL,
  `name` varchar(45) NOT NULL,
  `bdrms` varchar(45) NOT NULL,
  `beds` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `deped` int(11) NOT NULL,
  `govt` int(11) NOT NULL,
  `private` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cottages_guesthouses`
--

LOCK TABLES `cottages_guesthouses` WRITE;
/*!40000 ALTER TABLE `cottages_guesthouses` DISABLE KEYS */;
INSERT INTO `cottages_guesthouses` VALUES (1,'cottage','102','4','10','available',1700,2100,2600),(2,'cottage','103','4','10','available',1700,2100,2600),(3,'cottage','104','4','10','available',1700,2100,2600),(4,'cottage','105','4','10','available',1700,2100,2600),(5,'cottage','106','4','10','available',1700,2100,2600),(6,'cottage','201','3','7','available',1700,2100,2600),(7,'cottage','202','3','7','available',1400,1700,2300),(8,'cottage','203','3','7','available',1400,1700,2300),(9,'cottage','209','3','7','available',1400,1700,2300),(10,'cottage','204','2','5','available',1100,1400,1700),(11,'cottage','205','2','5','available',1100,1400,1700),(12,'cottage','206','2','5','available',1100,1400,1700),(13,'cottage','207','2','5','available',1100,1400,1700),(14,'cottage','208','2','5','available',1100,1400,1700),(15,'cottage','210 up','4','10','available',1700,2100,2600),(16,'cottage','210 down','3','7','available',1400,1700,2300),(17,'cottage','211','5','18','available',2100,2600,3300),(18,'cottage','212 up','3','7','available',1400,1700,2300),(19,'cottage','212 down','3','6','available',1100,1400,1700),(20,'cottage','1','5','17','available',2100,2600,3300),(21,'cottage','2 up','5','14','available',2100,2600,3300),(22,'cottage','2 down','3','9','available',1400,1700,2300),(23,'cottage','3 up','3','10','available',1700,2100,2600),(24,'cottage','3 down','3','9','available',1400,1700,2300),(25,'cottage','213A','2','4','available',1100,1400,1700),(26,'cottage','213B','2','4','available',1100,1400,1700),(27,'cottage','213C','3','6','available',1300,1600,1900),(28,'guesthouse','3 down','3','6','available',1300,1600,1900),(29,'guesthouse','3 base','3','6','available',1300,1600,1900),(30,'guesthouse','4','4','9','available',1400,1700,2300),(31,'guesthouse','4A','2','5','available',1100,1400,1700),(32,'guesthouse','4B','4','12','available',2100,2600,3300),(33,'guesthouse','4C','3','7','available',1700,2100,2600),(34,'guesthouse','4D','3','7','available',1700,2100,2600),(35,'guesthouse','5','4','14','available',2100,2600,3300),(36,'guesthouse','6','6','14','available',2100,2600,3300),(37,'guesthouse','7','3','7','available',1400,1700,2300),(38,'guesthouse','8 up','4','10','available',1700,2100,2600),(39,'guesthouse','8 down','2','5','available',1100,1400,1700),(40,'guesthouse','9','3','7','available',1400,1700,2300),(41,'guesthouse','10','4','9','available',1400,1700,2300),(42,'guesthouse','11','5','19','available',2100,2600,3300),(43,'textbookhouse','1 up','2','5','available',1100,1400,1700),(44,'textbookhouse','1 down','3','8','available',1400,1700,1900),(45,'guesthouse','4E','3','9','available',1700,2100,2600),(48,'guesthouse','4F','3','9','available',1700,2100,2600),(49,'guesthouse','5 down','3','8','available',1400,1700,2300),(50,'guesthouse','8 base','2','4','available',1100,1400,1700),(51,'guesthouse','10 base','1','3','available',1100,1400,1700),(52,'guesthouse','11 base','3','11','available',2100,2600,3300);
/*!40000 ALTER TABLE `cottages_guesthouses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dining_kitchen`
--

DROP TABLE IF EXISTS `dining_kitchen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dining_kitchen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `in` int(11) NOT NULL,
  `out` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dining_kitchen`
--

LOCK TABLES `dining_kitchen` WRITE;
/*!40000 ALTER TABLE `dining_kitchen` DISABLE KEYS */;
INSERT INTO `dining_kitchen` VALUES (1,'Abada Hall','available',2000,3500),(2,'Albert Hall','available',2000,3500),(3,'Dirty Kitchen','available',1100,1600);
/*!40000 ALTER TABLE `dining_kitchen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dorm_capacity`
--

DROP TABLE IF EXISTS `dorm_capacity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dorm_capacity` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dorm_id` int(11) NOT NULL,
  `room_no` varchar(45) NOT NULL,
  `room_capacity` varchar(45) NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  PRIMARY KEY (`id`),
  KEY `dorm_id_idx` (`dorm_id`),
  CONSTRAINT `dorm_id` FOREIGN KEY (`dorm_id`) REFERENCES `dormitories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dorm_capacity`
--

LOCK TABLES `dorm_capacity` WRITE;
/*!40000 ALTER TABLE `dorm_capacity` DISABLE KEYS */;
INSERT INTO `dorm_capacity` VALUES (1,2,'101','7',NULL,'available'),(2,2,'102','7',NULL,'available'),(3,2,'103','5',NULL,'available'),(4,2,'104','6',NULL,'available'),(5,2,'105','5',NULL,'available'),(6,2,'106','6',NULL,'available'),(7,2,'107','6',NULL,'available'),(8,2,'108','6',NULL,'available'),(9,2,'109','5',NULL,'available'),(10,2,'110','5',NULL,'available'),(11,2,'113','7',NULL,'available'),(12,2,'201','7',NULL,'available'),(13,2,'202','7',NULL,'available'),(14,2,'203','5',NULL,'available'),(15,2,'204','6',NULL,'available'),(16,2,'205','5',NULL,'available'),(17,2,'206','6',NULL,'available'),(18,2,'207','6',NULL,'available'),(19,2,'208','6',NULL,'available'),(20,2,'209','6',NULL,'available'),(21,2,'210','6',NULL,'available'),(22,2,'212','7',NULL,'available'),(23,2,'213','6',NULL,'available'),(24,2,'214','5',NULL,'available'),(25,4,'101','2',NULL,'available'),(26,4,'102','3',NULL,'available'),(27,4,'103','5',NULL,'available'),(28,4,'104','2',NULL,'available'),(29,4,'105','2',NULL,'available'),(30,4,'106','7',NULL,'available'),(31,4,'107','2',NULL,'available'),(32,4,'201','2',NULL,'available'),(33,4,'202','2',NULL,'available'),(34,4,'203','2',NULL,'available'),(35,4,'204','2',NULL,'available'),(36,4,'205','2',NULL,'available'),(37,4,'206','4',NULL,'available'),(38,4,'207','2',NULL,'available'),(39,4,'208','3',NULL,'available'),(40,4,'209','5',NULL,'available'),(41,4,'210','4',NULL,'available'),(42,4,'211','2',NULL,'available'),(43,4,'212','2',NULL,'available'),(44,5,'201','12',NULL,'available'),(45,5,'202','10',NULL,'available'),(46,5,'203','9',NULL,'available'),(47,5,'204','8',NULL,'available'),(48,5,'205','6',NULL,'available'),(49,5,'206','8',NULL,'available'),(50,5,'207','8',NULL,'available'),(51,5,'208','8',NULL,'available'),(52,5,'209','4',NULL,'available'),(53,5,'210','8',NULL,'available'),(54,5,'211','4',NULL,'available'),(55,5,'223','8',NULL,'available'),(56,5,'213','4',NULL,'available'),(57,5,'214','4',NULL,'available'),(58,5,'215','4',NULL,'available'),(59,5,'216','8',NULL,'available'),(60,5,'217','4',NULL,'available'),(61,5,'218','8',NULL,'available'),(62,5,'219','4',NULL,'available'),(63,5,'220','6',NULL,'available'),(64,5,'221','4',NULL,'available'),(65,6,'101','7',NULL,'available'),(66,6,'102','10',NULL,'available'),(67,6,'104','7',NULL,'available'),(68,6,'105','7',NULL,'available'),(69,6,'106','4',NULL,'available'),(70,6,'107','4',NULL,'available'),(71,6,'108','7',NULL,'available'),(72,6,'109','7',NULL,'available'),(73,6,'112','10',NULL,'available'),(74,6,'113','7',NULL,'available'),(75,6,'201','7',NULL,'available'),(76,6,'202','7',NULL,'available'),(77,6,'205','7',NULL,'available'),(78,6,'206','8',NULL,'available'),(79,6,'207','20',NULL,'available'),(80,6,'208','8',NULL,'available'),(81,6,'209','7',NULL,'available'),(82,6,'212','7',NULL,'available'),(83,6,'213','7',NULL,'available'),(84,6,'301','8',NULL,'available'),(85,6,'305','9',NULL,'available'),(86,6,'306','9',NULL,'available'),(87,6,'308','9',NULL,'available'),(88,6,'309','9',NULL,'available'),(89,6,'312','8',NULL,'available'),(90,6,'313','8',NULL,'available'),(91,7,'1','12',NULL,'available'),(92,7,'2','8',NULL,'available'),(93,7,'3','8',NULL,'available'),(94,7,'4','8',NULL,'available'),(95,7,'5','8',NULL,'available'),(96,7,'6','8',NULL,'available'),(97,7,'7','8',NULL,'available'),(98,7,'7A','8',NULL,'available'),(99,7,'8','10',NULL,'available'),(100,7,'9','10',NULL,'available'),(101,7,'10','12',NULL,'available'),(102,8,'101','5',NULL,'available'),(103,8,'102','8',NULL,'available'),(104,8,'103','14',NULL,'available'),(105,8,'201','13',NULL,'available'),(106,8,'202','13',NULL,'available'),(107,8,'203','13',NULL,'available'),(108,8,'204','2',NULL,'available'),(109,8,'205','3',NULL,'available'),(110,8,'102','8',NULL,'available'),(111,8,'103','14',NULL,'available'),(112,8,'201','13',NULL,'available'),(113,8,'202','13',NULL,'available'),(114,8,'203','13',NULL,'available'),(115,8,'204','2',NULL,'available'),(116,8,'205','3',NULL,'available'),(117,9,'101','7','A','available'),(118,9,'102','7','A','available'),(119,9,'103','7','A','available'),(120,9,'101','2','B','available'),(121,9,'102','3','B','available'),(122,9,'103','3','B','available'),(123,9,'201','7','C','available'),(124,9,'202','7','C','available'),(125,9,'203','7','C','available'),(126,9,'204','4','C','available'),(127,9,'201','4','D','available'),(128,9,'202','4','D','available'),(129,9,'203','4','D','available'),(130,10,'101','4',NULL,'available'),(131,10,'102','4',NULL,'available'),(132,10,'103','4',NULL,'available'),(133,10,'104','5',NULL,'available'),(134,10,'105','4',NULL,'available'),(135,10,'106','4',NULL,'available'),(136,10,'107','4',NULL,'available'),(137,10,'109','4',NULL,'available'),(138,10,'110','4',NULL,'available'),(139,10,'111','5',NULL,'available'),(140,10,'112','4',NULL,'available'),(141,10,'113','4',NULL,'available'),(142,10,'114','4',NULL,'available'),(143,11,'101','13',NULL,'available'),(144,11,'102','12',NULL,'available'),(145,11,'201','9',NULL,'available'),(146,11,'202','8',NULL,'available'),(147,11,'203','8',NULL,'available'),(148,11,'204','8',NULL,'available'),(149,11,'205','8',NULL,'available'),(150,11,'206','5',NULL,'available'),(151,12,'1','4',NULL,'available'),(152,12,'2','4',NULL,'available'),(153,12,'3','4',NULL,'available'),(154,12,'4','4',NULL,'available'),(155,12,'5','4',NULL,'available'),(156,12,'7','4',NULL,'available'),(157,12,'8','4',NULL,'available'),(158,13,'101','4',NULL,'available'),(159,13,'102','4',NULL,'available'),(160,13,'103','4',NULL,'available'),(161,13,'104','4',NULL,'available'),(162,13,'105','4',NULL,'available'),(163,13,'201','4',NULL,'available'),(164,13,'202','4',NULL,'available'),(165,13,'203','4',NULL,'available'),(166,13,'204','4',NULL,'available'),(167,13,'205','4',NULL,'available'),(168,13,'206','1',NULL,'available');
/*!40000 ALTER TABLE `dorm_capacity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dormitories`
--

DROP TABLE IF EXISTS `dormitories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dormitories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(3) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `deped` int(11) NOT NULL,
  `govt` int(11) NOT NULL,
  `private` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dormitories`
--

LOCK TABLES `dormitories` WRITE;
/*!40000 ALTER TABLE `dormitories` DISABLE KEYS */;
INSERT INTO `dormitories` VALUES (1,'1','White Hall','available',180,190,210),(2,'1','Recto Hall','available',180,190,210),(3,'1','SQ Medical','available',180,190,210),(4,'2','Pages Hall','available',180,190,210),(5,'2','Quirino Hall','available',150,180,200),(6,'2','Roxas Hall','available',150,180,200),(7,'2','Hernandez Hall','available',150,180,200),(8,'3','Escoda','available',120,130,170),(9,'3','Staffhouse','available',120,130,170),(10,'3','Magsaysay','available',120,130,170),(11,'3','SQ Main','available',120,130,170),(12,'3','SQ Annex','available',120,130,170),(13,'3','Bachelors Hall','available',120,130,170);
/*!40000 ALTER TABLE `dormitories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` enum('conference_halls','cottages_guesthouses','dining_kitchen','dormitories','other_services') NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `deped` int(11) DEFAULT NULL,
  `govt` int(11) DEFAULT NULL,
  `private` int(11) DEFAULT NULL,
  `liveindeped` int(11) DEFAULT NULL,
  `liveoutdeped` int(11) DEFAULT NULL,
  `liveinnondeped` int(11) DEFAULT NULL,
  `liveoutnondeped` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilities_used`
--

DROP TABLE IF EXISTS `facilities_used`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facilities_used` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservation_id` int(11) NOT NULL,
  `fac_id` int(11) DEFAULT NULL,
  `fac_type` enum('conference_halls','cottages_guesthouses','dining_kitchen','dormitories','other_services') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reser_id_idx` (`reservation_id`),
  KEY `resr_idx` (`reservation_id`),
  CONSTRAINT `resr` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities_used`
--

LOCK TABLES `facilities_used` WRITE;
/*!40000 ALTER TABLE `facilities_used` DISABLE KEYS */;
INSERT INTO `facilities_used` VALUES (2,1,4,'dormitories'),(3,2,15,'cottages_guesthouses'),(4,3,1,'cottages_guesthouses'),(17,4,2,'dining_kitchen'),(18,5,1,'conference_halls'),(19,6,18,'cottages_guesthouses'),(20,7,2,'dormitories'),(21,8,10,'dormitories'),(22,9,21,'cottages_guesthouses'),(23,10,4,'conference_halls');
/*!40000 ALTER TABLE `facilities_used` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_services`
--

DROP TABLE IF EXISTS `other_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `price` double NOT NULL,
  `charging_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_services`
--

LOCK TABLES `other_services` WRITE;
/*!40000 ALTER TABLE `other_services` DISABLE KEYS */;
INSERT INTO `other_services` VALUES (1,'Photocopy','available',2.5,'piece'),(2,'FAX Machine','available',40,'piece'),(3,'Telephone','available',5,'call'),(4,'Karaoke','available',330,'day'),(5,'Sound System','available',880,'day'),(6,'Overhead Projector','available',660,'day'),(7,'LCD Projector','available',2200,'day'),(8,'Conference Table','available',55,'day'),(9,'Monoblock Chairs','available',22,'day'),(10,'Table Cloth','available',22,'day'),(11,'Parachute','available',550,'day'),(12,'Grounds(Half Day)','available',550,'day'),(13,'Grounds(Whole Day)','available',1000,'day');
/*!40000 ALTER TABLE `other_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registration` (
  `reg_no` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `res_tel_no` varchar(45) DEFAULT NULL,
  `office_tel_no` varchar(45) DEFAULT NULL,
  `arrival_date` date NOT NULL,
  `departure_date` date NOT NULL,
  `no_persons` int(11) NOT NULL,
  `adults` int(11) DEFAULT NULL,
  `children` int(11) DEFAULT NULL,
  `emergency_person` varchar(50) DEFAULT NULL,
  `emergency_number` varchar(20) DEFAULT NULL,
  `client_type` enum('deped','govt','private','vip') NOT NULL,
  `id_number` varchar(45) DEFAULT NULL,
  `status` enum('submitted','pending','confirmed','done') NOT NULL,
  PRIMARY KEY (`reg_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `guest_type` enum('deped','govt','private','vip') NOT NULL,
  `category` enum('individual','organization') NOT NULL,
  `arrival` date NOT NULL,
  `departure` date NOT NULL,
  `no_persons` int(11) NOT NULL,
  `contact_no` varchar(45) NOT NULL,
  `activity` varchar(45) DEFAULT NULL,
  `status` enum('confirmed','unconfirmed','request') NOT NULL DEFAULT 'request',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'John Doe','deped','organization','2017-06-14','2017-06-16',20,'09179322197','seminar','request'),(2,'Jane Doe','govt','individual','2017-06-18','2017-06-20',5,'09302997498','workshop','confirmed'),(3,'Juan DelaCruz','private','individual','2017-06-22','2017-06-29',1,'09111223456','vacation','unconfirmed'),(4,'Dominik Deleon','deped','individual','2017-06-29','2017-07-03',5,'09124758392','jogging','request'),(5,'University of Makati','deped','organization','2017-12-01','2017-12-25',150,'09654365721','seminar','confirmed'),(6,'Taylor Shaw','private','individual','2017-08-15','2017-08-17',2,'09752567549','vacation','request'),(7,'Cebu Pacific','private','organization','2018-01-20','2018-01-30',30,'09993565432','seminar','confirmed'),(8,'Dbp','govt','organization','2017-07-03','2017-07-13',20,'09156433464','seminar','confirmed'),(9,'John Felizardo','private','individual','2017-07-13','2017-07-15',1,'09543462342','vacation','request'),(10,'University of the Philippines Diliman','deped','organization','2017-07-15','2017-07-25',100,'09765753345','seminar','unconfirmed');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-14 14:55:25
