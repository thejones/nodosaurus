select ST_Overlaps( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
