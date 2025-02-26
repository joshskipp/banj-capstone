-- Active: 1740520370830@@172.17.41.78@5432@banjdbv1
-- File: V002_user_tables.sql
-- Purpose: Create Project Table

CREATE TABLE prospector.projects (
    project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_name VARCHAR(255) NOT NULL,
    product VARCHAR(255),
    latitude DECIMAL(8,6),
    longitude DECIMAL(9,6),

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE prospector.commodities (
    commodity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity_name VARCHAR(255) NOT NULL,
    element VARCHAR(255),
    notes TEXT,
    units_of_measure VARCHAR(255),

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Junction table for projects and commodities (many-to-many)
CREATE TABLE prospector.project_commodities (
    project_id UUID NOT NULL REFERENCES prospector.projects(project_id) ON DELETE CASCADE,
    commodity_id UUID NOT NULL REFERENCES prospector.commodities(commodity_id) ON DELETE CASCADE,
    isPrimary BOOLEAN NOT NULL DEFAULT FALSE,
    isSecondary BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (project_id, commodity_id)
);

CREATE TABLE prospector.reserves (
    project_id UUID NOT NULL REFERENCES prospector.projects(project_id),
    commodity_id UUID NOT NULL REFERENCES prospector.commodities(commodity_id),
    tonnage VARCHAR(255),
    units_of_measurement VARCHAR(255),
    grade VARCHAR(255),
    estimate_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    PRIMARY KEY (project_id, commodity_id)
);

CREATE TABLE prospector.productions (
    project_id UUID NOT NULL REFERENCES prospector.projects(project_id),
    commodity_id UUID NOT NULL REFERENCES prospector.commodities(commodity_id),
    tonnage VARCHAR(255),
    units_of_measurement VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    PRIMARY KEY (project_id, commodity_id)
)

CREATE TABLE prospector.attachments (
    attachment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    link_name VARCHAR(255),
    link_url TEXT,
    file_name VARCHAR(255),
    file_url TEXT,
    notes TEXT,

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE prospector.companies (
    company_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    asx_code VARCHAR(8),
    notes text,

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Junction table for projects and companies (many-to-many)
CREATE TABLE prospector.company_projects (
    project_id UUID NOT NULL REFERENCES prospector.projects(project_id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES prospector.companies(company_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, company_id)
);

CREATE TABLE prospector.project_statuses (
    project_id UUID PRIMARY KEY NOT NULL REFERENCES prospector.projects(project_id) ON DELETE CASCADE,
    project_status VARCHAR(255) NOT NULL,
    status_detailed TEXT,

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
    approved_by VARCHAR(255),
    approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE prospector.key_events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_date DATE NOT NULL,
    event_details text,

    created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);