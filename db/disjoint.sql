select ST_Disjoint( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
