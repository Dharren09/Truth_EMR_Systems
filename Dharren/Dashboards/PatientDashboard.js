<html>
<head>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="profile">
        <img src="profile-picture.jpg" alt="Profile Picture" class="profile-picture"/>
        <span class="profile-name">John Doe</span>
      </div>
      <button class="logout-button">Logout</button>
    </div>
    <div class="sidebar">
      <ul class="sidebar-menu">
        <li class="sidebar-menu-item active">
          <a href="#" class="sidebar-menu-link">Medical History</a>
        </li>
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link">Lab Results</a>
        </li>
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link">Radiography Results</a>
        </li>
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link">Payments</a>
        </li>
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link">Schedule Appointment</a>
        </li>
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link">Services</a>
        </li>
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link">Settings</a>
        </li>
      </ul>
      <p class="sidebar-footer">&copy; TruthMD EHS Services, All rights reserved</p>
    </div>
    <div class="main">
      <div class="dashboard-cards">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Patient Vitals</h2>
          </div>
          <div class="card-content">
            <div class="vitals-item">
              <span class="vitals-label">Blood Pressure:</span>
              <span class="vitals-value">120/80 mmHg</span>
            </div>
            <div class="vitals-item">
              <span class="vitals-label">Pulse:</span>
              <span class="vitals-value">72 bpm</span>
            </div>
            <div class="vitals-item">
              <span class="vitals-label">SpO2:</span>
              <span class="vitals-value">98%</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Weight, Height, and BMI</h2>
          </div>
          <div class="card-content">
            <div class="weight-height-bmi-item">
              <span class="weight-height-bmi-label">Weight:</span>
              <span class="weight-height-bmi-value">70 kg</span>
            </div>
            <div class="weight-height-bmi-item">
              <span class="weight-height-bmi-label">Height:</span>
              <span class="weight-height-bmi-value">180 cm</span>
            </div>
            <div class="weight-height-bmi-item">
              <span class="weight-height-bmi-label">BMI:</span>
              <span class="weight-height-bmi-value">21.6</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Blood Group and Allergies</h2>
          </div>
          <div class="card-content">
            <div class="blood-group-allergies-item">
              <span class="blood-group-allergies-label">Blood Group:</span>
              <span class="blood-group-allergies-value">A+</span>
            </div>
            <div class="blood-group-allergies-item">
              <span class="blood-group-allergies-label">Allergies:</span>
              <span class="blood-group-allergies-value">None</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Visits and Date Documents</h2>
          </div>
          <div class="card-content">
            <ul class="visits-list">
              <li class="visit-item">
                <span class="visit-date">July 15, 2023</span>
                <span class="visit-description">General Checkup</span>
              </li>
              <li class="visit-item">
                <span class="visit-date">June 28, 2023</span>
                <span class="visit-description">Blood Test</span>
              </li>
              <li class="visit-item">
                <span class="visit-date">May 10, 2023</span>
                <span class="visit-description">Follow-up Appointment</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Notifications</h2>
          </div>
          <div class="card-content">
            <ul class="notifications-list">
              <li class="notification-item">
                <span class="notification-message">New appointment scheduled on July 20, 2023</span>
              </li>
              <li class="notification-item">
                <span class="notification-message">Recommended vaccination: Flu shot</span>
              </li>
              <li class="notification-item">
                <span class="notification-message">System maintenance on July 18, 2023</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Educational Content</h2>
          </div>
          <div class="card-content">
            <div class="educational-content">
              <img src="educational-image.jpg" alt="Educational Content" class="educational-image"/>
              <p class="educational-description">Check out our latest article on healthy living!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>