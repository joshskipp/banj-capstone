-- Samle SELECT for all project info

SELECT 
    -- Project basic information
    p.project_id,
    p.project_name,
    p.product,
    p.latitude,
    p.longitude,
    p.created_by AS project_created_by,
    p.created_at AS project_created_at,
    p.updated_at AS project_updated_at,
    p.approved_status AS project_approved_status,
    p.approved_by AS project_approved_by,
    p.approved_at AS project_approved_at,
    -- Project status information
    ps.project_status,
    ps.status_detailed,
    -- Company information
    c.company_id,
    c.company_name,
    c.asx_code,
    c.notes AS company_notes,
    -- Commodity information
    com.commodity_id,
    com.commodity_name,
    com.element,
    com.units_of_measure,
    com.notes AS commodity_notes,
    pc.isPrimary,
    pc.isSecondary,
    -- Reserves information
    r.tonnage AS reserve_tonnage,
    r.units_of_measurement AS reserve_units,
    r.grade AS reserve_grade,
    r.estimate_date AS reserve_estimate_date,
    r.notes AS reserve_notes,
    -- Production information
    prod.tonnage AS production_tonnage,
    prod.units_of_measurement AS production_units,
    prod.start_date AS production_start_date,
    prod.end_date AS production_end_date,
    prod.notes AS production_notes
FROM prospector.projects p
-- Project status (one-to-one)
LEFT JOIN prospector.project_statuses ps ON p.project_id = ps.project_id
-- Companies (many-to-many)
LEFT JOIN prospector.company_projects cp ON p.project_id = cp.project_id
LEFT JOIN prospector.companies c ON cp.company_id = c.company_id
-- Commodities (many-to-many)
LEFT JOIN prospector.project_commodities pc ON p.project_id = pc.project_id
LEFT JOIN prospector.commodities com ON pc.commodity_id = com.commodity_id
-- Reserves (one-to-many per commodity)
LEFT JOIN prospector.reserves r ON p.project_id = r.project_id AND com.commodity_id = r.commodity_id
-- Production (one-to-many per commodity)
LEFT JOIN prospector.productions prod ON p.project_id = prod.project_id AND com.commodity_id = prod.commodity_id
-- Filter for a specific project (replace 'Golden Valley' with your project name)
WHERE p.project_name = 'Golden Valley';