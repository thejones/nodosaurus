SELECT row_to_json(fc)
FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
FROM (SELECT 'Feature' As type
  , ST_AsGeoJSON(ST_Transform(lg.geom, ,4326))::json As geometry
  , row_to_json(lp) As properties
  FROM $1 As lg
  INNER JOIN (
    SELECT s.* FROM $1
    -- IF $1 IS NOT NULL
    -- THEN
    -- LIMIT $1
    -- END IF;
  ) As lp
  ON lg.loc_id = lp.loc_id  ) As f )  As fc;
