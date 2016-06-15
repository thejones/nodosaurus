select ST_Crosses( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
