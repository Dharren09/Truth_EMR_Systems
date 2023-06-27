SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Truthmd`
--

-- --------------------------------------------------------

--
-- Table structure for table 'patient'
--

CREATE TABLE IF NOT EXISTS `patient` (
  `patient_id` int(10) NOT NULL,
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
  INDEX `idx_patient_id` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `patient`
INSERT INTO `patient` (`patient_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `address`, `image`, `email`, `insurance_information`)
VALUES (224453553, 'Beatrice', 'Zana', '2002-03-26', 'Female', '7865641399', 'South Africa', '', 'gmhs13@yopmail.com', 'Prudential');

--
-- Table structure for table `Health_worker`
--

CREATE TABLE IF NOT EXISTS `health_worker` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `image` LONGBLOB NOT NULL,
  `department` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `health_worker`
INSERT INTO `health_worker` (`id`, `patient_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `phone`, `address`, `image`, `department`, `email`)
VALUES (2, 224453553, 'Elior', 'Truth', '2023-03-28', 'Male', '7865641399', 'Nyanama', '', 'Neurosurgery', 'elior@icloud.com');

--
-- Table structure for table `appointment`
--

CREATE TABLE IF NOT EXISTS `appointment` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `department` varchar(255) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `date` DATE NOT NULL,
  `time` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `appointment`
INSERT INTO `appointment` (`id`, `patient_id`, `department`, `doctor_name`, `date`, `time`)
VALUES (1, 224453553, 'ObsGyn', 'Elior Truth', '2023-03-26', '10:43 AM');

-- --------------------------------------------------------

--
-- Table structure for `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `department`
INSERT INTO `department` (`id`, `name`) VALUES (3, 'Neurosurgery');

--
-- Table structure for table 'medical_history'
--

-- Table structure for table 'medical_history'
CREATE TABLE IF NOT EXISTS `medical_history` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `allergies` varchar(500) NOT NULL,
  `past_treatment` varchar(500) NOT NULL,
  `current_medication` varchar(500) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 'medical_history'
INSERT INTO `medical_history` (`id`, `patient_id`, `allergies`, `past_treatment`, `current_medication`)
VALUES (6, 224453553, 'Penicillin', 'Appendectomy in 2010', 'None');

-- --------------------------------------------------------

--
-- Table structure for table 'diagnosis'
--

CREATE TABLE IF NOT EXISTS `diagnosis` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `diagnosis_name` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 'diagnosis'
INSERT INTO `diagnosis` (`id`, `patient_id`, `diagnosis_name`, `date`)
VALUES (2, 224453553, 'Polycystic Ovarian Syndrome', '22/08/2022');

-- --------------------------------------------------------

--
-- Table structure for table 'medication'
--

CREATE TABLE IF NOT EXISTS `medication` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `medication_name` varchar(55) NOT NULL,
  `dosage` int(20) NOT NULL,
  `frequency` varchar(55) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 'medication'
INSERT INTO `medication` (`id`, `patient_id`, `medication_name`, `dosage`, `frequency`)
VALUES (7, 224453553, 'caps wellwoman', 4, 'one tab, once a day for one month');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `login`
INSERT INTO `login` (`id`, `username`, `password`, `email`, `email_status`)
VALUES (1, 'Jesca Namembwa', 'Kwagala2023', 'kwagala@gmail.com', 'verified');

-- --------------------------------------------------------

--
-- Table structure for `billings`
--

CREATE TABLE IF NOT EXISTS `billings` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `procedure_code` varchar(30) NOT NULL,
  `total_bill` int(30) NOT NULL,
  `reason_for_payment` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `billings`
INSERT INTO `billings` (`id`, `patient_id`, `procedure_code`, `total_bill`, `reason_for_payment`)
VALUES (1, 224453553, 2212, 150000, 'Treatment and Laboratory');

-- ------------------------------------------------------------

--
-- Table structure for table `radiography`
--

CREATE TABLE IF NOT EXISTS `radiography` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `image` LONGBLOB NOT NULL,
  `done_by` varchar(255) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 'radiography'
INSERT INTO `radiography` (`id`, `patient_id`, `date`, `time`, `result`, `image`, `done_by`)
VALUES (4, 224453553, '2023-03-20', '12:00 am', 'Ovarian Syndrome', NULL, 'Wycliffe, Kampala Imaging Centre');

--
-- Table structure for table `lab`
--

CREATE TABLE IF NOT EXISTS `lab` (
  `id` int(10) NOT NULL,
  `patient_id` int(10) NOT NULL,
  `test_name` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  `done_by` varchar(200) NOT NULL,
  FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table `lab`
INSERT INTO `lab` (`id`, `patient_id`, `test_name`, `result`, `done_by`)
VALUES (21, 224453553, 'Hormonal Profile', 'Elevated FSH', 'Warid, Ebenezer Laboratories');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verify`
--

INSERT INTO `verify` (`id`, `username`, `email`, `token`) VALUES
(16, 'alamin', 'te555@yopmail.com', 'ix8enxdh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  MODIFY `username` varchar(50) NOT NULL,
  MODIFY `email` varchar(100) NOT NULL,
  MODIFY `token` varchar(50) NOT NULL;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `health_worker`
--
ALTER TABLE `health_worker`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `medical_history`
--
ALTER TABLE `medical_history`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `diagnosis`
--
ALTER TABLE `diagnosis`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `medication`
--
ALTER TABLE `medication`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `radiography`
--
ALTER TABLE `radiography`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `billings`
--
ALTER TABLE `billings`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE `lab`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `verify`
--
ALTER TABLE `verify`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

COMMIT;
