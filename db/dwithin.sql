select ST_DWithin( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
