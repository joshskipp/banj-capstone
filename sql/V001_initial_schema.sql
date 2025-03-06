-- File: V001_initial_schema.sql
-- Purpose: Base database setup with schemas and extensions

CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS prospector;

-- Install required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Basic configuration
SET timezone = 'UTC';