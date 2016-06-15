select ST_Touches( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
