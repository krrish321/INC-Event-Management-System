CREATE DATABASE IF NOT EXISTS event_management;
USE event_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  designation VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_datetime DATETIME,
  end_datetime DATETIME,
  issue_date DATE,
  location VARCHAR(255),
  event_type ENUM('Dhrana','Meeting','Bandh','Rally','Sabha','Gayaapan'),
  level ENUM('Jila','Block') DEFAULT 'Jila',
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  media_type ENUM('photo','video','coverage') NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE event_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE event_updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  location VARCHAR(255),
  event_date DATETIME,
  attendees_count INT DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- sample users
INSERT INTO users (name, code, role, designation) VALUES
('Admin User','9999','admin','Super Admin'),
('Demo User','1234','user','Jila Adhyaksh');

-- sample event
INSERT INTO events (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by)
VALUES ('Sample Rally', 'Demo rally description', '2025-09-25 10:00:00', '2025-09-25 14:00:00', '2025-09-01', 'Indore Ground', 'Rally', 'Jila', 1);
