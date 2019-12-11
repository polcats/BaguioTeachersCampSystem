-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2017 at 06:25 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teacherscamp`
--

-- --------------------------------------------------------

--
-- Table structure for table `conference_halls`
--

CREATE TABLE `conference_halls` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `in_deped` int(11) NOT NULL,
  `in_nondeped` int(11) NOT NULL,
  `out_deped` int(11) NOT NULL,
  `out_nondeped` int(11) NOT NULL,
  `capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conference_halls`
--

INSERT INTO `conference_halls` (`id`, `name`, `status`, `in_deped`, `in_nondeped`, `out_deped`, `out_nondeped`, `capacity`) VALUES
(1, 'Benitez Hall', 'available', 4000, 4500, 5000, 5500, 1000),
(2, 'Carlos P. Romulo', 'available', 1800, 2200, 2800, 3300, 700),
(3, 'Quezon Hall Main', 'available', 2200, 2700, 3200, 3700, 250),
(4, 'Quezon Hall Down', 'available', 1700, 2200, 2700, 3200, 100),
(5, 'Quirino Conference Hall', 'available', 2200, 2700, 2700, 3200, 150),
(6, 'Quirino Canteen', 'available', 1100, 1200, 1600, 1800, 100),
(7, 'Oring-ao Hall', 'available', 900, 1100, 1300, 1600, 70),
(8, 'Audio Visual Room', 'available', 1300, 1600, 1600, 2100, 100),
(9, 'Pages Conference Hall', 'available', 1350, 1650, 1650, 2150, 55);

-- --------------------------------------------------------

--
-- Table structure for table `cottages_guesthouses`
--

CREATE TABLE `cottages_guesthouses` (
  `id` int(10) NOT NULL,
  `type` enum('cottage','guesthouse','textbookhouse','vip') NOT NULL,
  `name` varchar(45) NOT NULL,
  `bdrms` varchar(45) NOT NULL,
  `beds` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `deped` int(11) NOT NULL,
  `govt` int(11) NOT NULL,
  `private` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cottages_guesthouses`
--

INSERT INTO `cottages_guesthouses` (`id`, `type`, `name`, `bdrms`, `beds`, `status`, `deped`, `govt`, `private`) VALUES
(1, 'cottage', '102', '4', '10', 'available', 1700, 2100, 2600),
(2, 'cottage', '103', '4', '10', 'available', 1700, 2100, 2600),
(3, 'cottage', '104', '4', '10', 'available', 1700, 2100, 2600),
(4, 'cottage', '105', '4', '10', 'available', 1700, 2100, 2600),
(5, 'cottage', '106', '4', '10', 'available', 1700, 2100, 2600),
(6, 'cottage', '201', '3', '7', 'available', 1700, 2100, 2600),
(7, 'cottage', '202', '3', '7', 'available', 1400, 1700, 2300),
(8, 'cottage', '203', '3', '7', 'available', 1400, 1700, 2300),
(9, 'cottage', '209', '3', '7', 'available', 1400, 1700, 2300),
(10, 'cottage', '204', '2', '5', 'available', 1100, 1400, 1700),
(11, 'cottage', '205', '2', '5', 'available', 1100, 1400, 1700),
(12, 'cottage', '206', '2', '5', 'available', 1100, 1400, 1700),
(13, 'cottage', '207', '2', '5', 'available', 1100, 1400, 1700),
(14, 'cottage', '208', '2', '5', 'available', 1100, 1400, 1700),
(15, 'cottage', '210 up', '4', '10', 'available', 1700, 2100, 2600),
(16, 'cottage', '210 down', '3', '7', 'available', 1400, 1700, 2300),
(17, 'cottage', '211', '5', '18', 'available', 2100, 2600, 3300),
(18, 'cottage', '212 up', '3', '7', 'available', 1400, 1700, 2300),
(19, 'cottage', '212 down', '3', '6', 'available', 1100, 1400, 1700),
(20, 'cottage', '1', '5', '17', 'available', 2100, 2600, 3300),
(21, 'cottage', '2 up', '5', '14', 'available', 2100, 2600, 3300),
(22, 'cottage', '2 down', '3', '9', 'available', 1400, 1700, 2300),
(23, 'cottage', '3 up', '3', '10', 'available', 1700, 2100, 2600),
(24, 'cottage', '3 down', '3', '9', 'available', 1400, 1700, 2300),
(25, 'cottage', '213A', '2', '4', 'available', 1100, 1400, 1700),
(26, 'cottage', '213B', '2', '4', 'available', 1100, 1400, 1700),
(27, 'cottage', '213C', '3', '6', 'available', 1300, 1600, 1900),
(28, 'guesthouse', '3 down', '3', '6', 'available', 1300, 1600, 1900),
(29, 'guesthouse', '3 base', '3', '6', 'available', 1300, 1600, 1900),
(30, 'guesthouse', '4', '4', '9', 'available', 1400, 1700, 2300),
(31, 'guesthouse', '4A', '2', '5', 'available', 1100, 1400, 1700),
(32, 'guesthouse', '4B', '4', '12', 'available', 2100, 2600, 3300),
(33, 'guesthouse', '4C', '3', '7', 'available', 1700, 2100, 2600),
(34, 'guesthouse', '4D', '3', '7', 'available', 1700, 2100, 2600),
(35, 'guesthouse', '5', '4', '14', 'available', 2100, 2600, 3300),
(36, 'guesthouse', '6', '6', '14', 'available', 2100, 2600, 3300),
(37, 'guesthouse', '7', '3', '7', 'available', 1400, 1700, 2300),
(38, 'guesthouse', '8 up', '4', '10', 'available', 1700, 2100, 2600),
(39, 'guesthouse', '8 down', '2', '5', 'available', 1100, 1400, 1700),
(40, 'guesthouse', '9', '3', '7', 'available', 1400, 1700, 2300),
(41, 'guesthouse', '10', '4', '9', 'available', 1400, 1700, 2300),
(42, 'guesthouse', '11', '5', '19', 'available', 2100, 2600, 3300),
(43, 'textbookhouse', '1 up', '2', '5', 'available', 1100, 1400, 1700),
(44, 'textbookhouse', '1 down', '3', '8', 'available', 1400, 1700, 1900),
(45, 'guesthouse', '4E', '3', '9', 'available', 1700, 2100, 2600),
(48, 'guesthouse', '4F', '3', '9', 'available', 1700, 2100, 2600),
(49, 'guesthouse', '5 down', '3', '8', 'available', 1400, 1700, 2300),
(50, 'guesthouse', '8 base', '2', '4', 'available', 1100, 1400, 1700),
(51, 'guesthouse', '10 base', '1', '3', 'available', 1100, 1400, 1700),
(52, 'guesthouse', '11 base', '3', '11', 'available', 2100, 2600, 3300),
(53, 'vip', 'Executive bldg 1', '5', '11', 'available', 0, 0, 0),
(54, 'vip', 'Executive bldg 2', '3', '9', 'available', 0, 0, 0),
(55, 'vip', 'Executive bldg 3', '6', '11', 'available', 0, 0, 0),
(56, 'vip', 'Executive bldg 4', '2', '6', 'available', 0, 0, 0),
(57, 'vip', 'Executive cot 101', '4', '9', 'available', 0, 0, 0),
(58, 'vip', 'Executive cot 107', '3', '9', 'available', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dining_kitchen`
--

CREATE TABLE `dining_kitchen` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `in` int(11) NOT NULL,
  `out` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `remaining_capacity` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dining_kitchen`
--

INSERT INTO `dining_kitchen` (`id`, `name`, `status`, `in`, `out`, `capacity`, `remaining_capacity`) VALUES
(1, 'Abada Hall', 'available', 2000, 3500, 500, 500),
(2, 'Albert Hall Main', 'available', 2000, 3500, 500, 0),
(3, 'Dirty Kitchen', 'available', 1100, 1600, 0, 0),
(4, 'Albert Hall Left Wing', 'available', 1000, 1100, 100, 0),
(5, 'Albert Hall Right Wing', 'available', 1000, 1100, 150, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dormitories`
--

CREATE TABLE `dormitories` (
  `id` int(11) NOT NULL,
  `category` varchar(3) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `deped` int(11) NOT NULL,
  `govt` int(11) NOT NULL,
  `private` int(11) NOT NULL,
  `capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dormitories`
--

INSERT INTO `dormitories` (`id`, `category`, `name`, `status`, `deped`, `govt`, `private`, `capacity`) VALUES
(1, '1', 'White Hall', 'not_available', 180, 190, 210, 0),
(2, '1', 'Recto Hall', 'available', 180, 190, 210, 143),
(3, '1', 'SQ Medical', 'not_available', 180, 190, 210, 0),
(4, '2', 'Pages Hall', 'available', 180, 190, 210, 55),
(5, '2', 'Quirino Hall', 'available', 150, 180, 200, 139),
(6, '2', 'Roxas Hall', 'available', 150, 180, 200, 208),
(7, '2', 'Hernandez Hall', 'available', 150, 180, 200, 100),
(8, '3', 'Escoda', 'available', 120, 130, 170, 137),
(9, '3', 'Staffhouse', 'available', 120, 130, 170, 66),
(10, '3', 'Magsaysay', 'available', 120, 130, 170, 54),
(11, '3', 'SQ Main', 'available', 120, 130, 170, 71),
(12, '3', 'SQ Annex', 'available', 120, 130, 170, 28),
(13, '3', 'Bachelors Hall', 'available', 120, 130, 170, 41);

-- --------------------------------------------------------

--
-- Table structure for table `dorm_rooms`
--

CREATE TABLE `dorm_rooms` (
  `id` int(11) UNSIGNED NOT NULL,
  `dorm_id` int(11) NOT NULL,
  `room_no` varchar(45) NOT NULL,
  `room_capacity` varchar(45) NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dorm_rooms`
--

INSERT INTO `dorm_rooms` (`id`, `dorm_id`, `room_no`, `room_capacity`, `unit`, `status`) VALUES
(1, 2, '101', '7', NULL, 'available'),
(2, 2, '102', '7', NULL, 'available'),
(3, 2, '103', '5', NULL, 'available'),
(4, 2, '104', '6', NULL, 'available'),
(5, 2, '105', '5', NULL, 'available'),
(6, 2, '106', '6', NULL, 'available'),
(7, 2, '107', '6', NULL, 'available'),
(8, 2, '108', '6', NULL, 'available'),
(9, 2, '109', '5', NULL, 'available'),
(10, 2, '110', '5', NULL, 'available'),
(11, 2, '113', '7', NULL, 'available'),
(12, 2, '201', '7', NULL, 'available'),
(13, 2, '202', '7', NULL, 'available'),
(14, 2, '203', '5', NULL, 'available'),
(15, 2, '204', '6', NULL, 'available'),
(16, 2, '205', '5', NULL, 'available'),
(17, 2, '206', '6', NULL, 'available'),
(18, 2, '207', '6', NULL, 'available'),
(19, 2, '208', '6', NULL, 'available'),
(20, 2, '209', '6', NULL, 'available'),
(21, 2, '210', '6', NULL, 'available'),
(22, 2, '212', '7', NULL, 'available'),
(23, 2, '213', '6', NULL, 'available'),
(24, 2, '214', '5', NULL, 'available'),
(25, 4, '101', '2', NULL, 'available'),
(26, 4, '102', '3', NULL, 'available'),
(27, 4, '103', '5', NULL, 'available'),
(28, 4, '104', '2', NULL, 'available'),
(29, 4, '105', '2', NULL, 'available'),
(30, 4, '106', '7', NULL, 'available'),
(31, 4, '107', '2', NULL, 'available'),
(32, 4, '201', '2', NULL, 'available'),
(33, 4, '202', '2', NULL, 'available'),
(34, 4, '203', '2', NULL, 'available'),
(35, 4, '204', '2', NULL, 'available'),
(36, 4, '205', '2', NULL, 'available'),
(37, 4, '206', '4', NULL, 'available'),
(38, 4, '207', '2', NULL, 'available'),
(39, 4, '208', '3', NULL, 'available'),
(40, 4, '209', '5', NULL, 'available'),
(41, 4, '210', '4', NULL, 'available'),
(42, 4, '211', '2', NULL, 'available'),
(43, 4, '212', '2', NULL, 'available'),
(44, 5, '201', '12', NULL, 'available'),
(45, 5, '202', '10', NULL, 'available'),
(46, 5, '203', '9', NULL, 'available'),
(47, 5, '204', '8', NULL, 'available'),
(48, 5, '205', '6', NULL, 'available'),
(49, 5, '206', '8', NULL, 'available'),
(50, 5, '207', '8', NULL, 'available'),
(51, 5, '208', '8', NULL, 'available'),
(52, 5, '209', '4', NULL, 'available'),
(53, 5, '210', '8', NULL, 'available'),
(54, 5, '211', '4', NULL, 'available'),
(55, 5, '223', '8', NULL, 'available'),
(56, 5, '213', '4', NULL, 'available'),
(57, 5, '214', '4', NULL, 'available'),
(58, 5, '215', '4', NULL, 'available'),
(59, 5, '216', '8', NULL, 'available'),
(60, 5, '217', '4', NULL, 'available'),
(61, 5, '218', '8', NULL, 'available'),
(62, 5, '219', '4', NULL, 'available'),
(63, 5, '220', '6', NULL, 'available'),
(64, 5, '221', '4', NULL, 'available'),
(65, 6, '101', '7', NULL, 'available'),
(66, 6, '102', '10', NULL, 'available'),
(67, 6, '104', '7', NULL, 'available'),
(68, 6, '105', '7', NULL, 'available'),
(69, 6, '106', '4', NULL, 'available'),
(70, 6, '107', '4', NULL, 'available'),
(71, 6, '108', '7', NULL, 'available'),
(72, 6, '109', '7', NULL, 'available'),
(73, 6, '112', '10', NULL, 'available'),
(74, 6, '113', '7', NULL, 'available'),
(75, 6, '201', '7', NULL, 'available'),
(76, 6, '202', '7', NULL, 'available'),
(77, 6, '205', '7', NULL, 'available'),
(78, 6, '206', '8', NULL, 'available'),
(79, 6, '207', '20', NULL, 'available'),
(80, 6, '208', '8', NULL, 'available'),
(81, 6, '209', '7', NULL, 'available'),
(82, 6, '212', '7', NULL, 'available'),
(83, 6, '213', '7', NULL, 'available'),
(84, 6, '301', '8', NULL, 'available'),
(85, 6, '305', '9', NULL, 'available'),
(86, 6, '306', '9', NULL, 'available'),
(87, 6, '308', '9', NULL, 'available'),
(88, 6, '309', '9', NULL, 'available'),
(89, 6, '312', '8', NULL, 'available'),
(90, 6, '313', '8', NULL, 'available'),
(91, 7, '1', '12', NULL, 'available'),
(92, 7, '2', '8', NULL, 'available'),
(93, 7, '3', '8', NULL, 'available'),
(94, 7, '4', '8', NULL, 'available'),
(95, 7, '5', '8', NULL, 'available'),
(96, 7, '6', '8', NULL, 'available'),
(97, 7, '7', '8', NULL, 'available'),
(98, 7, '7A', '8', NULL, 'available'),
(99, 7, '8', '10', NULL, 'available'),
(100, 7, '9', '10', NULL, 'available'),
(101, 7, '10', '12', NULL, 'available'),
(102, 8, '101', '5', NULL, 'available'),
(103, 8, '102', '8', NULL, 'available'),
(104, 8, '103', '14', NULL, 'available'),
(105, 8, '201', '13', NULL, 'available'),
(106, 8, '202', '13', NULL, 'available'),
(107, 8, '203', '13', NULL, 'available'),
(108, 8, '204', '2', NULL, 'available'),
(109, 8, '205', '3', NULL, 'available'),
(110, 8, '102', '8', NULL, 'available'),
(111, 8, '103', '14', NULL, 'available'),
(112, 8, '201', '13', NULL, 'available'),
(113, 8, '202', '13', NULL, 'available'),
(114, 8, '203', '13', NULL, 'available'),
(115, 8, '204', '2', NULL, 'available'),
(116, 8, '205', '3', NULL, 'available'),
(117, 9, '101', '7', 'A', 'available'),
(118, 9, '102', '7', 'A', 'available'),
(119, 9, '103', '7', 'A', 'available'),
(120, 9, '101', '2', 'B', 'available'),
(121, 9, '102', '3', 'B', 'available'),
(122, 9, '103', '3', 'B', 'available'),
(123, 9, '201', '7', 'C', 'available'),
(124, 9, '202', '7', 'C', 'available'),
(125, 9, '203', '7', 'C', 'available'),
(126, 9, '204', '4', 'C', 'available'),
(127, 9, '201', '4', 'D', 'available'),
(128, 9, '202', '4', 'D', 'available'),
(129, 9, '203', '4', 'D', 'available'),
(130, 10, '101', '4', NULL, 'available'),
(131, 10, '102', '4', NULL, 'available'),
(132, 10, '103', '4', NULL, 'available'),
(133, 10, '104', '5', NULL, 'available'),
(134, 10, '105', '4', NULL, 'available'),
(135, 10, '106', '4', NULL, 'available'),
(136, 10, '107', '4', NULL, 'available'),
(137, 10, '109', '4', NULL, 'available'),
(138, 10, '110', '4', NULL, 'available'),
(139, 10, '111', '5', NULL, 'available'),
(140, 10, '112', '4', NULL, 'available'),
(141, 10, '113', '4', NULL, 'available'),
(142, 10, '114', '4', NULL, 'available'),
(143, 11, '101', '13', NULL, 'available'),
(144, 11, '102', '12', NULL, 'available'),
(145, 11, '201', '9', NULL, 'available'),
(146, 11, '202', '8', NULL, 'available'),
(147, 11, '203', '8', NULL, 'available'),
(148, 11, '204', '8', NULL, 'available'),
(149, 11, '205', '8', NULL, 'available'),
(150, 11, '206', '5', NULL, 'available'),
(151, 12, '1', '4', NULL, 'available'),
(152, 12, '2', '4', NULL, 'available'),
(153, 12, '3', '4', NULL, 'available'),
(154, 12, '4', '4', NULL, 'available'),
(155, 12, '5', '4', NULL, 'available'),
(156, 12, '7', '4', NULL, 'available'),
(157, 12, '8', '4', NULL, 'available'),
(158, 13, '101', '4', NULL, 'available'),
(159, 13, '102', '4', NULL, 'available'),
(160, 13, '103', '4', NULL, 'available'),
(161, 13, '104', '4', NULL, 'available'),
(162, 13, '105', '4', NULL, 'available'),
(163, 13, '201', '4', NULL, 'available'),
(164, 13, '202', '4', NULL, 'available'),
(165, 13, '203', '4', NULL, 'available'),
(166, 13, '204', '4', NULL, 'available'),
(167, 13, '205', '4', NULL, 'available'),
(168, 13, '206', '1', NULL, 'available');

--
-- Triggers `dorm_rooms`
--
DELIMITER $$
CREATE TRIGGER `update_cap_ondelete` BEFORE DELETE ON `dorm_rooms` FOR EACH ROW UPDATE dormitories 
	SET capacity = capacity - (select room_capacity from dorm_rooms where id = OLD.id)
WHERE dormitories.id =  OLD.dorm_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_cap_oninsert` AFTER INSERT ON `dorm_rooms` FOR EACH ROW IF NEW.status = 'available'
THEN UPDATE dormitories 
	SET capacity = (SELECT SUM(room_capacity) FROM dorm_rooms where dorm_id = NEW.dorm_id)
WHERE dormitories.id =  NEW.dorm_id;
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_cap_onupdate` AFTER UPDATE ON `dorm_rooms` FOR EACH ROW IF NEW.status = 'available'
THEN UPDATE dormitories 
	SET capacity = (SELECT SUM(room_capacity) FROM dorm_rooms where dorm_id = NEW.dorm_id)
WHERE dormitories.id =  NEW.dorm_id;
ELSEIF NEW.status = 'not_available'
THEN UPDATE dormitories 
	SET capacity = capacity - (select room_capacity from dorm_rooms where id = NEW.id)
WHERE dormitories.id =  NEW.dorm_id;
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `username`, `password`) VALUES
(1, 'Paul', 'Catalan', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `type` enum('conference_halls','cottages_guesthouses','dining_kitchen','dormitories','other_services') NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `deped` int(11) DEFAULT NULL,
  `govt` int(11) DEFAULT NULL,
  `private` int(11) DEFAULT NULL,
  `liveindeped` int(11) DEFAULT NULL,
  `liveoutdeped` int(11) DEFAULT NULL,
  `liveinnondeped` int(11) DEFAULT NULL,
  `liveoutnondeped` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `facilities_used`
--

CREATE TABLE `facilities_used` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `fac_id` int(11) DEFAULT NULL,
  `fac_type` enum('conference_halls','cottages_guesthouses','dining_kitchen','dormitories','dorm_room','other_services') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `facilities_used`
--

INSERT INTO `facilities_used` (`id`, `reservation_id`, `fac_id`, `fac_type`) VALUES
(111, 92, 93, 'dorm_room'),
(112, 94, 2, 'conference_halls'),
(113, 95, 12, 'cottages_guesthouses'),
(114, 95, 6, 'cottages_guesthouses'),
(115, 95, 1, 'cottages_guesthouses'),
(116, 96, 9, 'cottages_guesthouses'),
(117, 96, 2, 'conference_halls'),
(118, 96, 52, 'cottages_guesthouses'),
(119, 96, 5, 'dormitories'),
(120, 96, 5, 'dining_kitchen'),
(121, 96, 7, 'other_services'),
(126, 97, 2, 'conference_halls'),
(127, 97, 3, 'dining_kitchen'),
(128, 97, 5, 'other_services'),
(129, 98, 49, 'cottages_guesthouses'),
(130, 98, 1, 'conference_halls'),
(131, 99, 1, 'conference_halls');

-- --------------------------------------------------------

--
-- Table structure for table `other_services`
--

CREATE TABLE `other_services` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `price` double NOT NULL,
  `charging_type` varchar(45) NOT NULL,
  `reservable` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `other_services`
--

INSERT INTO `other_services` (`id`, `name`, `status`, `price`, `charging_type`, `reservable`) VALUES
(1, 'Photocopy', 'available', 2.5, 'piece', 'no'),
(2, 'FAX Machine', 'available', 40, 'piece', 'no'),
(3, 'Telephone', 'available', 5, 'call', 'no'),
(4, 'Karaoke', 'available', 330, 'day', 'yes'),
(5, 'Sound System', 'available', 880, 'day', 'yes'),
(6, 'Overhead Projector', 'available', 660, 'day', 'yes'),
(7, 'LCD Projector', 'available', 2200, 'day', 'yes'),
(8, 'Conference Table', 'available', 55, 'day', 'no'),
(9, 'Monoblock Chairs', 'available', 22, 'day', 'no'),
(10, 'Table Cloth', 'available', 22, 'day', 'no'),
(11, 'Parachute', 'not_available', 550, 'day', 'yes'),
(12, 'Grounds', 'available', 1000, 'day', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `registered_facilities`
--

CREATE TABLE `registered_facilities` (
  `id` int(11) NOT NULL,
  `registration_id` int(11) NOT NULL,
  `fac_id` int(11) DEFAULT NULL,
  `fac_type` enum('conference_halls','cottages_guesthouses','dining_kitchen','dormitories','dorm_room','other_services') NOT NULL,
  `use_start` date NOT NULL,
  `use_end` date NOT NULL,
  `occupants` int(11) NOT NULL DEFAULT '0',
  `status` enum('done','ongoing','cancelled') NOT NULL DEFAULT 'ongoing'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registered_facilities`
--

INSERT INTO `registered_facilities` (`id`, `registration_id`, `fac_id`, `fac_type`, `use_start`, `use_end`, `occupants`, `status`) VALUES
(1, 1, 1, 'dining_kitchen', '2017-06-01', '2017-06-09', 22, 'done'),
(2, 2, 1, 'dining_kitchen', '2017-06-22', '2017-06-24', 28, 'cancelled');

--
-- Triggers `registered_facilities`
--
DELIMITER $$
CREATE TRIGGER `cap_update_ins` AFTER INSERT ON `registered_facilities` FOR EACH ROW IF NEW.status = 'ongoing' and NEW.fac_type = "dining_kitchen"
THEN UPDATE dining_kitchen SET remaining_capacity = dining_kitchen.capacity-(SELECT SUM(occupants) FROM registered_facilities WHERE fac_type = "dining_kitchen"
 group by fac_type)
WHERE dining_kitchen.id =  NEW.fac_id;
elseif NEW.status = 'cancelled' or NEW.status = 'done'
THEN UPDATE dining_kitchen SET remaining_capacity = remaining_capacity = remaining_capacity + (select occupants from registered_facilities where id = NEW.id)
WHERE dining_kitchen.id =  NEW.fac_id;
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cap_update_update` AFTER UPDATE ON `registered_facilities` FOR EACH ROW IF NEW.status = 'ongoing' and NEW.fac_type = "dining_kitchen"
THEN UPDATE dining_kitchen SET remaining_capacity = dining_kitchen.capacity-(SELECT SUM(occupants) FROM registered_facilities WHERE fac_type = "dining_kitchen"
 group by fac_type)
WHERE dining_kitchen.id =  NEW.fac_id;
elseif NEW.status = 'cancelled' or NEW.status = 'done'
THEN UPDATE dining_kitchen SET remaining_capacity = remaining_capacity + (select occupants from registered_facilities where id = NEW.id)
WHERE dining_kitchen.id =  NEW.fac_id;
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `reg_no` int(11) NOT NULL,
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
  `status` enum('submitted','pending','confirmed','done') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `affiliation` enum('deped','govt','private','vip') NOT NULL,
  `contact_person` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `contact_no1` varchar(45) NOT NULL,
  `contact_no2` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `category` enum('individual','group') NOT NULL,
  `no_persons` int(11) NOT NULL DEFAULT '1',
  `adults` int(11) NOT NULL DEFAULT '0',
  `seniors_pwd` int(11) NOT NULL DEFAULT '0',
  `children` int(11) NOT NULL DEFAULT '0',
  `activity` varchar(45) DEFAULT NULL,
  `lodging` enum('in','out') NOT NULL,
  `arrival` date NOT NULL,
  `departure` date NOT NULL,
  `remarks` varchar(100) NOT NULL,
  `status` enum('confirmed','unconfirmed','request','cancelled') NOT NULL DEFAULT 'unconfirmed',
  `encoder` varchar(100) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `confirmation_date` date DEFAULT NULL,
  `cancellation_date` date DEFAULT NULL,
  `confirmed_by` varchar(45) DEFAULT NULL,
  `cancelled_by` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `affiliation`, `contact_person`, `address`, `contact_no1`, `contact_no2`, `email`, `category`, `no_persons`, `adults`, `seniors_pwd`, `children`, `activity`, `lodging`, `arrival`, `departure`, `remarks`, `status`, `encoder`, `date_created`, `confirmation_date`, `cancellation_date`, `confirmed_by`, `cancelled_by`) VALUES
(92, '123', 'deped', '', '', '123', '123', '', 'group', 22, 0, 0, 0, '123', 'in', '2017-06-21', '2017-06-23', '', 'cancelled', 'Paul Catalan', '2017-06-21 03:42:58', '2017-06-23', '2017-06-23', 'Paul Catalan', 'Paul Catalan'),
(93, 'qwe', 'deped', 'qwe', 'qwe', '12', '12', 'qwe', 'individual', 14, 12, 2, 2, '12', 'in', '2017-06-23', '2017-06-27', '', 'cancelled', 'Paul Catalan', '2017-06-23 00:34:12', '2017-06-23', '2017-06-25', 'Paul Catalan', 'Paul Catalan'),
(94, 'qwe', 'deped', 'qwe', 'qwe', '12', '12', 'qwe', 'individual', 14, 12, 2, 2, '12', 'in', '2017-06-23', '2017-06-27', '', 'cancelled', 'Paul Catalan', '2017-06-23 00:35:56', '2017-06-23', '2017-06-23', 'Paul Catalan', 'Paul Catalan'),
(95, '123', 'deped', '123', '123', '123', '123', '123', 'individual', 25, 25, 0, 0, '123', 'in', '2017-06-23', '2017-06-30', '', 'cancelled', 'Paul Catalan', '2017-06-23 01:59:47', '2017-06-25', '2017-06-25', 'Paul Catalan', 'Paul Catalan'),
(96, 'trybug', 'govt', 'pol', '123', '222', '', '', 'group', 12, 0, 0, 0, '123', 'in', '2017-06-25', '2017-06-30', '', 'cancelled', 'Paul Catalan', '2017-06-25 11:17:30', '2017-06-26', '2017-06-25', 'Paul Catalan', 'Paul Catalan'),
(97, 'testbug', 'deped', 'Kappa2x', 'Banal Ata St., Gotham City2x', '09212234569', '69', 'quack@quk.com2x', 'group', 99, 0, 0, 0, 'meeting2x', 'in', '2017-06-27', '2017-06-30', '23debt222', 'cancelled', 'Paul Catalan', '2017-06-27 00:25:22', '2017-06-27', '2017-06-27', 'Paul Catalan', 'Paul Catalan'),
(98, '123', 'deped', '2222', '123', '123', '', '', 'individual', 14, 12, 0, 2, '12', 'in', '2017-06-27', '2017-06-30', '123', 'cancelled', 'Paul Catalan', '2017-06-27 03:33:03', '2017-06-27', '2017-06-27', 'Paul Catalan', 'Paul Catalan'),
(99, '123', 'deped', '123', '123', '123', '123', '123', 'individual', 26, 3, 2, 23, '123', 'in', '2017-06-28', '2017-06-30', '123', 'confirmed', 'Paul Catalan', '2017-06-28 01:34:36', '2017-06-28', NULL, 'Paul Catalan', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conference_halls`
--
ALTER TABLE `conference_halls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cottages_guesthouses`
--
ALTER TABLE `cottages_guesthouses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dining_kitchen`
--
ALTER TABLE `dining_kitchen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dormitories`
--
ALTER TABLE `dormitories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dorm_rooms`
--
ALTER TABLE `dorm_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dorm_id_idx` (`dorm_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilities_used`
--
ALTER TABLE `facilities_used`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reser_id_idx` (`reservation_id`),
  ADD KEY `resr_idx` (`reservation_id`);

--
-- Indexes for table `other_services`
--
ALTER TABLE `other_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registered_facilities`
--
ALTER TABLE `registered_facilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reser_id_idx` (`registration_id`),
  ADD KEY `resr_idx` (`registration_id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`reg_no`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conference_halls`
--
ALTER TABLE `conference_halls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `cottages_guesthouses`
--
ALTER TABLE `cottages_guesthouses`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `dining_kitchen`
--
ALTER TABLE `dining_kitchen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `dormitories`
--
ALTER TABLE `dormitories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `dorm_rooms`
--
ALTER TABLE `dorm_rooms`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `facilities_used`
--
ALTER TABLE `facilities_used`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
--
-- AUTO_INCREMENT for table `other_services`
--
ALTER TABLE `other_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `registered_facilities`
--
ALTER TABLE `registered_facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `reg_no` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `dorm_rooms`
--
ALTER TABLE `dorm_rooms`
  ADD CONSTRAINT `dorm_id` FOREIGN KEY (`dorm_id`) REFERENCES `dormitories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `facilities_used`
--
ALTER TABLE `facilities_used`
  ADD CONSTRAINT `resr` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
