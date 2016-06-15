select ST_Intersects( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
