DROP DATABASE IF EXISTS agenda_muni;
CREATE DATABASE agenda_muni;
USE agenda_muni;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL
);

CREATE TABLE citizens(
id INT AUTO_INCREMENT PRIMARY KEY,
rut VARCHAR(15) NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
address VARCHAR(100) NOT NULL,
email VARCHAR(100),
phone VARCHAR(15) NOT NULL,
phone_2 VARCHAR(15)
);

CREATE TABLE departments(
id INT AUTO_INCREMENT PRIMARY KEY,
dep_name VARCHAR(100) NOT NULL
);

CREATE TABLE appointments (
id INT AUTO_INCREMENT PRIMARY KEY,
cause TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
appointment_date DATETIME NOT NULL,
citizen_id INT NOT NULL,
FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE CASCADE
);

CREATE TABLE referrals(
	id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    appointment_id INT,
    outcome TEXT,
    ref_status ENUM('pendiente', 'en proceso', 'finalizada'),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);


INSERT INTO users (username, password) VALUES ('admin', SHA2('admin', 256));

INSERT INTO citizens (rut, first_name, last_name, address, email, phone, phone_2) VALUES ('1234567-8', 'Juan', 'Pérez', 'Calle 123', 'juan.perez@gmail.com', '+569 12345678', '+569 87654321');
INSERT INTO citizens (rut, first_name, last_name, address, email, phone) VALUES ('2234567-8', 'Juana', 'López', 'Calle 456', 'juana.lopez@gmail.com', '+569 12345678');

INSERT INTO departments (dep_name) VALUES ('Administración y Finanzas');
INSERT INTO departments (dep_name) VALUES ('Administración Municipal');
INSERT INTO departments (dep_name) VALUES ('Dirección de Obras');
INSERT INTO departments (dep_name) VALUES ('Dirección de Seguridad, Tránsito y Transporte Público');
INSERT INTO departments (dep_name) VALUES ('Control Interno');
INSERT INTO departments (dep_name) VALUES ('Dirección Jurídica');
INSERT INTO departments (dep_name) VALUES ('Secretaría Municipal');
INSERT INTO departments (dep_name) VALUES ('Dirección de Desarrollo Comunal');
INSERT INTO departments (dep_name) VALUES ('Dirección de Desarrollo Local');
INSERT INTO departments (dep_name) VALUES ('Secretaría Comunal de Planificación');
INSERT INTO departments (dep_name) VALUES ('Juzgado de Policía Local');


INSERT INTO appointments (cause, appointment_date, citizen_id) VALUES ('Renombrar Chile', '2024-12-06 09:00:00', 1);
INSERT INTO appointments (cause, appointment_date, citizen_id) VALUES ('Destruir Castro', '2025-04-27 23:59:59', 2);

INSERT INTO referrals (department_id, appointment_id, outcome, ref_status) VALUES (4, 1, "Ahora se va a llamar Chule", 1);
INSERT INTO referrals (department_id, appointment_id, outcome, ref_status) VALUES (7, 2, "Señora cállese xd", 2);