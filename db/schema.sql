CREATE TABLE IF NOT EXISTS Tasks (
  id INT UNSIGNED AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  task_status varchar(255) NOT NULL,
  PRIMARY KEY (id)
)