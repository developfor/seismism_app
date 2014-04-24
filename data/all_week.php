<?php

header('Content-type: application/xml');
echo file_get_contents("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv");

?>