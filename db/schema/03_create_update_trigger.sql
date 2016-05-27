-- You do not need this. It is up to you.
CREATE FUNCTION on_record_update() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at := now();
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER users_update
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE on_record_update();
