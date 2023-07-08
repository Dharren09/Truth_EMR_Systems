--
-- script to create database tables for truthmd
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database name ( Truthmd )
--

-- create the database
CREATE DATABASE `Truthmd`;

-- Table structure for `Patients`

CREATE TABLE `patient` (
  `patient_id` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `image` LONGBLOB NOT NULL,
  `email` varchar(255) NOT NULL,
  `insurance_information` varchar(255) NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `clinical_notes`

CREATE TABLE `clinical_notes` (
  `note_id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `complaints` varchar(500) NOT NULL,
  `medical_history` varchar(500) NOT NULL,
  `examination_report` varchar(500) NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  PRIMARY KEY (`note_id`),
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `roles`

CREATE TABLE `roles` (
  `role_id` int(10) NOT NULL AUTO_INCREMENT=10,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `roles`

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Doctor'),
(2, 'Nurse'),
(3, 'Midwife'),
(4, 'Lab Technician'),
(5, 'Radiographer'),
(6, 'Dentist'),
(7, 'Hospital'),
(8, 'Clinic'),
(9, 'Insurance Company'),
(10, 'Insurance Officer'),
(11, 'Billing Officer'),
(12, 'Cashier'),
(13, 'Receptionist');

CREATE TABLE `health_worker` (
  `worker_id` int(10) NOT NULL AUTO_INCREMENT,
  `role_id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `image` LONGBLOB NOT NULL,
  `email` varchar(255) NOT NULL,
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  FOREIGN KEY (`id`) REFERENCES `department` (`id`),
  PRIMARY KEY (`worker_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `appointment`

CREATE TABLE `appointment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `department` varchar(255) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `date` DATE NOT NULL,
  `time` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  FOREIGN KEY (`id`) REFERENCES `department` (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `department`

CREATE TABLE `department` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `department`
INSERT INTO `department` (`id`, `name`) VALUES
(1, 'Cardiology'),
(2, 'Dermatology'),
(3, 'Obsterics and Gynecology'),
(4, 'Emergency Medicine'),
(5, 'Laboratory'),
(6, 'Nursing'),
(7, 'Ophthalmology'),
(8, 'Dental'),
(9, 'Pediatrics'),
(10, 'Psychiatry'),
(11, 'Radiology'),
(12, 'Surgery'),
(13, 'Internal Medicine'),
(14, 'Pharmacy');

-- Table structure for `Prescription`

CREATE TABLE `prescription` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL AUTO_INCREMENT,
  `medication_name` varchar(55) NOT NULL,
  `dosage` int(20) NOT NULL,
  `frequency` varchar(55) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table Structure for `billings`

CREATE TABLE `billings` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `procedure_code` varchar(30) NOT NULL,
  `total_bill` int(30) NOT NULL,
  `reason_for_payment` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `health_worker` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `lab`

CREATE TABLE `lab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `test_name` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `done_by` varchar(200) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `radiography`

CREATE TABLE `radiography` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `patient_id` int(10) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `image` LONGBLOB NOT NULL,
  `done_by` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `verify`

CREATE TABLE `verify` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `login`

CREATE TABLE `login` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `users`

CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `email_status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;