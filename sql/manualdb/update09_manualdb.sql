ALTER TABLE poi
	MODIFY poi_id VARCHAR(64),
	ADD COLUMN submitted BIGINT(19) NULL DEFAULT NULL,
	ADD CONSTRAINT poi_id UNIQUE KEY(poi_id);
