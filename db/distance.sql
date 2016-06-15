select ST_Distance( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
