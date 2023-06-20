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

CREATE TABLE 'patients' (
  'patient_id' int(10) NOT NULL PRIMARY KEY,
  'first_name' varchar(255) NOT NULL,
  'last_name' varchar(255) NOT NULL,
  'date_of_birth' varchar(30) NOT NULL,
  'gender' varchar(20) NOT NULL,
  'phone' varchar(20) NOT NULL,
  'address' varchar(100) NOT NULL,
  'email' varchar(255) NOT NULL,
  'insurance_information' varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for 'patient'
--

INSERT INTO 'patient' ('patient_id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'phone', 'adress', 'email`, `insurance_information') VALUES
(6, 'Beatrice', 'Zana', '26/03/2002', 'Female', '7865641399', 'South Africa',  'gmhs13@yopmail.com', 'Prudential');

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  'id' int(10) NOT NULL,
  'patient_id' int(10) NOT NULL FOREIGN KEY,
  'department' varchar(255) NOT NULL,
  'doctor_name' varchar(255) NOT NULL,
  'date' varchar(255) NOT NULL,
  'time' varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` ('id', 'patient_id', 'department', 'doctor_name', 'date', 'time', 'email', 'phone') VALUES
(6, '266636612', 'ObsGyn', 'Elior Truth', '26/03/2023', '10:43 AM', 'gmhs13@yopmail.com', '760604249');

-- --------------------------------------------------------

--
-- Table structure for table 'medical_history'
--

CREATE TABLE 'medical_history' (
  'id' int(10) NOT NULL,
  'patient_id' int(10) NOT NULL FOREIGN KEY,
  'allergies' varchar(500) NOT NULL,
  'past_treatmet' varchar(500) NOT NULL,
  'past_diagnosis' varchar(50) NOT NULL,
  'family_medical_history' varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table 'medical_history'
--

INSERT INTO 'medical_history' ('id', 'patient_id', 'allergies', 'past_treatment', 'past_diagnosis', 'family_medical_history') VALUES
(1, '266636612', 'sulphur', 'tabs Cefixime 200 once daily 5/7', 'UTI,s', 'Diabetes Mellitus');

-- --------------------------------------------------------

--
-- Table structure for table 'diagnosis'
--

CREATE TABLE 'departments' (
  'id' int(10) NOT NULL,
  'patient_id' int(10) NOT NULL FOREIGN KEY,
  'diagnosis_name' varchar(255) NOT NULL,
  'date' varchar(50) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table 'diagnosis'
--

INSERT INTO 'diagnosis' ('id', 'patient_id', 'diagnosis_name', 'date') VALUES
(2, '266636612', 'Polycystic Ovarian Syndrome' '22/08/2022');
-- --------------------------------------------------------

--
-- Table structure for table 'medication'
--

CREATE TABLE 'medication' (
  'id' int(10) NOT NULL,
  'patient_id' NOT NULL FOREIGN KEY,
  'medication_name' varchar(55) NOT NULL,
  'dosage' int(20) NOT NULL,
  'frequency' varchar(55) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table 'medication'
--

INSERT INTO 'medication' ('id', 'patient_id', 'medication_name', 'dosage', 'frequency') VALUES
(7, '266636612', 4, 'caps wellwoman', 'one tab', 'once a day for one month');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `email`) VALUES
(1, 'Jesca Namembwa', 'Kwagala2023', 'kwagala@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table 'radiography'
--

CREATE TABLE `store` (
  'id' int(10) NOT NULL,
  'patient_id' int(10) NOT NULL FOREIGN KEY,
  'date' varchar(255) NOT NULL,
  'time' varchar(255) NOT NULL,
  'result' varchar(255) NOT NULL,
  'image' text NOT NULL,
  'done_by' varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table 'radiography'
--

INSERT INTO `store` ('id', 'patient_id', `p_date`, `expire`, `expire_end`, `price`, `quantity`) VALUES
(4, 'Napa', '20/03/2020', '2', '19/03/2020', '8', '100'),
(8, 'Seclo', '24/03/2020', '2', '24/03/2020', '5', '200'),
(9, 'Napa', '24/03/2020', '1 ', '19/03/2020', '10', '20'),
(10, 'max', '11/03/2020', '1 ', '12/03/2020', '10', '100');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `temp`
--

INSERT INTO `temp` (`id`, `email`, `token`) VALUES
(19, 'test555@yopmail.com', '46fn0pl3'),
(19, 'test555@yopmail.com', 'w6pvf2oq'),
(21, 'te555@yopmail.com', '9sfs6gu8');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE 'lab' (
  'id' int(255) NOT NULL,
  'patient_id' int(10) NOT NULL PRIMARY KEY,
  'test_name' varchar(255) NOT NULL,
  'result' varchar(255) NOT NULL,
  'done_by' varchar(200) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` ('id', 'patient_id', 'test_name', 'result', 'done_by') VALUES
(21, '22333222', 'Hormonal Profile', 'Elevated FSH', 'Wycliffe, Ebenezer laboratories');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  'id' int(10) NOT NULL,
  'username' varchar(255) NOT NULL,
  'email' varchar(255) NOT NULL,
  'token' varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verify`
--

INSERT INTO 'verify' ('id', 'username', 'email', 'token') VALUES
(16, 'alamin', 'te555@yopmail.com', 'ix8enxdh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table 'patient'
--
ALTER TABLE 'patient'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table `appointment`
--
ALTER TABLE 'appointment'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'medical_history'
--
ALTER TABLE 'medical_history'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'diagnosis'
--
ALTER TABLE 'diagnosis'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'medication'
--
ALTER TABLE 'medication'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'radiograpy'
--
ALTER TABLE 'radiography'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'billings'
--
ALTER TABLE 'billings'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'login'
--
ALTER TABLE 'login'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table 'lab'
--
ALTER TABLE 'lab'
  ADD PRIMARY KEY ('id');

--
-- Indexes for table `verify`
--
ALTER TABLE 'verify'
  ADD PRIMARY KEY ('id');

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table 'patient'
--
ALTER TABLE 'patient'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table 'appointment'
--
ALTER TABLE 'appointment'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table 'medical_history'
--
ALTER TABLE 'medical_history'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE 'diagnosis'
  MODIFY 'id' int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table 'medication'
--
ALTER TABLE 'medication'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table 'radiography'
--
ALTER TABLE 'radiography'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `billings'
--
ALTER TABLE 'billings'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table 'login'
--
ALTER TABLE 'login'
  MODIFY 'id' int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE 'store'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE 'lab'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table 'verify'
--
ALTER TABLE 'verify'
  MODIFY 'id' int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
