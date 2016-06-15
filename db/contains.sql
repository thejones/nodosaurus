-- select ST_Contains( ST_GeomFromGeoJSON($1), ST_GeomFromGeoJSON($2) )
select ST_Contains( $1, $2 )
