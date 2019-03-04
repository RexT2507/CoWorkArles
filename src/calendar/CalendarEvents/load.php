<?php

//load.php

$connect = new PDO('mysql:host=localhost;dbname=test', 'root', 'progikserver.');

$data = array();

$query = "SELECT * FROM events ORDER BY id";

$statement = $connect->prepare($query);

$statement->execute();

$result = $statement->fetchAll();

foreach($result as $row)
{
 $data[] = array(
  'id'   => $row["id"],
  'title'   => $row["title"],
  'description' => $row["description"],
  'start'   => $row["start_event"],
  'end'   => $row["end_event"],
  'url'   => $row["url"]
 );
}

echo json_encode($data);

?>