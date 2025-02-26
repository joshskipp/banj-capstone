-- File: V003_initial_test_data.sql
-- Purpose: Seed database with initial test data for development and testing

-- Insert sample commodities
INSERT INTO prospector.commodities (commodity_name, element, units_of_measure, notes, created_by)
VALUES 
    ('Gold', 'Au', 'oz', 'Precious metal with symbol Au', 'data_migration'),
    ('Silver', 'Ag', 'oz', 'Precious metal with symbol Ag', 'data_migration'),
    ('Copper', 'Cu', 'tonnes', 'Base metal with symbol Cu', 'data_migration'),
    ('Iron', 'Fe', 'tonnes', 'Industrial metal used for steel production', 'data_migration'),
    ('Lithium', 'Li', 'tonnes', 'Critical mineral for batteries', 'data_migration'),
    ('Nickel', 'Ni', 'tonnes', 'Used in stainless steel and batteries', 'data_migration'),
    ('Uranium', 'U', 'pounds', 'Used for nuclear energy', 'data_migration');

-- Insert sample projects
INSERT INTO prospector.projects (project_name, product, latitude, longitude, created_by, approved_status)
VALUES 
    ('Golden Valley', 'Gold Mine', -31.950527, 115.860458, 'data_migration', 'approved'),
    ('Silver Creek', 'Silver Mine', -33.865143, 151.209900, 'data_migration', 'approved'),
    ('Copper Hills', 'Copper Mine', -27.470125, 153.021072, 'data_migration', 'approved'),
    ('Iron Ridge', 'Iron Ore Mine', -34.928621, 138.599959, 'data_migration', 'pending'),
    ('Lithium Lakes', 'Lithium Processing', -37.840935, 144.946457, 'data_migration', 'new');

-- Connect projects with commodities
INSERT INTO prospector.project_commodities (project_id, commodity_id, isPrimary, isSecondary)
VALUES 
    -- Golden Valley primarily produces gold, with silver as secondary
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Golden Valley'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Gold'),
     TRUE, FALSE),
    
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Golden Valley'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Silver'),
     FALSE, TRUE),
    
    -- Silver Creek primarily produces silver
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Silver Creek'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Silver'),
     TRUE, FALSE),
    
    -- Copper Hills primarily produces copper
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Copper Hills'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Copper'),
     TRUE, FALSE),
    
    -- Iron Ridge primarily produces iron
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Iron Ridge'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Iron'),
     TRUE, FALSE),
    
    -- Lithium Lakes primarily produces lithium
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Lithium Lakes'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Lithium'),
     TRUE, FALSE);

-- Insert sample companies
INSERT INTO prospector.companies (company_name, asx_code, notes, created_by, approved_status)
VALUES 
    ('Mineral Resources Ltd', 'MIN', 'Large mining company with multiple operations', 'data_migration', 'approved'),
    ('Gold Fields Australia', 'GFA', 'Specializes in gold mining across Australia', 'data_migration', 'approved'),
    ('Copper Mountain Mining', 'CMM', 'Focuses on copper extraction and processing', 'data_migration', 'approved'),
    ('Resource Ventures', 'RVL', 'Exploration company seeking new deposits', 'data_migration', 'pending'),
    ('Australian Mining Group', 'AMG', 'Diversified mining operations', 'data_migration', 'approved');

-- Fix the reference in company_projects (it incorrectly referenced commodities instead of companies)
-- Note: Your schema has an error. The correct version should be:
-- CREATE TABLE prospector.company_projects (
--     project_id UUID NOT NULL REFERENCES prospector.projects(project_id) ON DELETE CASCADE,
--     company_id UUID NOT NULL REFERENCES prospector.companies(company_id) ON DELETE CASCADE,
--     PRIMARY KEY (project_id, company_id)
-- );

-- For now, we'll insert data assuming the correct schema:
INSERT INTO prospector.company_projects (project_id, company_id)
VALUES 
    -- Mineral Resources operates Iron Ridge and Lithium Lakes
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Iron Ridge'),
     (SELECT company_id FROM prospector.companies WHERE company_name = 'Mineral Resources Ltd')),
    
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Lithium Lakes'),
     (SELECT company_id FROM prospector.companies WHERE company_name = 'Mineral Resources Ltd')),
    
    -- Gold Fields Australia operates Golden Valley
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Golden Valley'),
     (SELECT company_id FROM prospector.companies WHERE company_name = 'Gold Fields Australia')),
    
    -- Copper Mountain Mining operates Copper Hills
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Copper Hills'),
     (SELECT company_id FROM prospector.companies WHERE company_name = 'Copper Mountain Mining')),
    
    -- Australian Mining Group operates Silver Creek
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Silver Creek'),
     (SELECT company_id FROM prospector.companies WHERE company_name = 'Australian Mining Group'));

-- Insert project statuses
INSERT INTO prospector.project_statuses (project_id, project_status, status_detailed, created_by, approved_status)
VALUES 
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Golden Valley'),
     'Operational', 'Currently producing at 85% capacity', 'data_migration', 'approved'),
    
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Silver Creek'),
     'Operational', 'Recently expanded operations in Q4 2023', 'data_migration', 'approved'),
    
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Copper Hills'),
     'Development', 'Construction phase, expected completion in Q2 2025', 'data_migration', 'approved'),
    
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Iron Ridge'),
     'Planning', 'Finalizing feasibility studies and permits', 'data_migration', 'pending'),
    
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Lithium Lakes'),
     'Exploration', 'Initial drilling program underway', 'data_migration', 'new');

-- Insert reserves data
INSERT INTO prospector.reserves (project_id, commodity_id, tonnage, units_of_measurement, grade, estimate_date, notes, created_by, approved_status)
VALUES 
    -- Golden Valley gold reserves
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Golden Valley'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Gold'),
     '2.5 million', 'tonnes', '3.2 g/t', '2023-09-15', 'JORC compliant estimate', 'data_migration', 'approved'),
    
    -- Silver Creek silver reserves
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Silver Creek'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Silver'),
     '4.8 million', 'tonnes', '125 g/t', '2023-11-20', 'Updated after recent exploration', 'data_migration', 'approved'),
    
    -- Copper Hills copper reserves
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Copper Hills'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Copper'),
     '35 million', 'tonnes', '0.8%', '2024-01-10', 'Includes measured and indicated resources', 'data_migration', 'approved'),
    
    -- Iron Ridge iron reserves
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Iron Ridge'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Iron'),
     '125 million', 'tonnes', '62% Fe', '2024-02-28', 'Preliminary estimate pending further drilling', 'data_migration', 'pending');

-- Insert production data
INSERT INTO prospector.productions (project_id, commodity_id, tonnage, units_of_measurement, start_date, end_date, notes, created_by, approved_status)
VALUES 
    -- Golden Valley gold production
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Golden Valley'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Gold'),
     '250,000', 'tonnes', '2023-01-01', '2023-12-31', 'Annual production for 2023', 'data_migration', 'approved'),
    
    -- Silver Creek silver production
    ((SELECT project_id FROM prospector.projects WHERE project_name = 'Silver Creek'),
     (SELECT commodity_id FROM prospector.commodities WHERE commodity_name = 'Silver'),
     '320,000', 'tonnes', '2023-01-01', '2023-12-31', 'Annual production for 2023', 'data_migration', 'approved');

-- Insert attachments
INSERT INTO prospector.attachments (link_name, link_url, file_name, file_url, notes, created_by, approved_status)
VALUES 
    ('Golden Valley Website', 'https://example.com/golden-valley', NULL, NULL, 'Official project website', 'data_migration', 'approved'),
    ('Silver Creek Annual Report', NULL, 'SilverCreek_2023_Annual.pdf', 'https://example.com/files/SilverCreek_2023_Annual.pdf', '2023 financial performance', 'data_migration', 'approved'),
    ('Copper Hills Environmental Assessment', NULL, 'CopperHills_Env_Assessment.pdf', 'https://example.com/files/CopperHills_Env_Assessment.pdf', 'Environmental impact study', 'data_migration', 'approved'),
    ('Iron Ridge Project Overview', 'https://example.com/iron-ridge', 'IronRidge_Overview.pdf', 'https://example.com/files/IronRidge_Overview.pdf', 'Project summary and timeline', 'data_migration', 'pending');

-- Insert key events
INSERT INTO prospector.key_events (event_date, event_details, created_by)
VALUES 
    ('2023-03-15', 'Golden Valley expansion approved, increasing production capacity by 35%', 'data_migration'),
    ('2023-07-22', 'Silver Creek discovered high-grade silver vein during exploration drilling', 'data_migration'),
    ('2023-09-05', 'Copper Hills received final environmental approval for development', 'data_migration'),
    ('2023-11-18', 'Iron Ridge completed feasibility study with positive economic indicators', 'data_migration'),
    ('2024-01-10', 'Lithium Lakes commenced initial exploration program', 'data_migration'),
    ('2024-02-28', 'Australian Mining Group announced merger with Resource Ventures', 'data_migration');