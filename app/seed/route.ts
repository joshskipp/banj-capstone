import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function createUsers() {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     await sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;
//
//     const insertedUsers = await Promise.all(
//         users.map(async (user) => {
//           const hashedPassword = await bcrypt.hash(user.password, 10);
//           return sql`
//             INSERT INTO users (id, name, email, password)
//             VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//             ON CONFLICT (id) DO NOTHING;
//           `;
//         }),
//       );
// }

// async function createProjects() {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`CREATE TABLE IF NOT EXISTS projects (
//         project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//         project_name VARCHAR(255) NOT NULL,
//         product VARCHAR(255),
//         latitude DECIMAL(8,6),
//         longitude DECIMAL(9,6),
    
//         created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//         approved_by VARCHAR(255),
//         approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
//     );`;
// }

// async function createCommodities() {
//     await sql `CREATE TABLE IF NOT EXISTS commodities (
//     commodity_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     commodity_name VARCHAR(255) NOT NULL,
//     element VARCHAR(255),
//     notes TEXT,
//     units_of_measure VARCHAR(255),

//     created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//     approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//     approved_by VARCHAR(255),
//     approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
// );`
// }

// async function createCompanies() {
//     await sql `CREATE TABLE  IF NOT EXISTS companies (
//         company_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//         company_name VARCHAR(255) NOT NULL,
//         asx_code VARCHAR(8),
//         notes text,

//         created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//         approved_by VARCHAR(255),
//         approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
//     );`
// }

// async function seedData() {
//     await sql`TRUNCATE companies CASCADE;`
//     await sql`TRUNCATE projects CASCADE;`
//     await sql`TRUNCATE commodities CASCADE;`
//     await sql`TRUNCATE project_commodities CASCADE;`

//     await sql`INSERT INTO projects (project_name, product, latitude, longitude, created_by, approved_status)
//             VALUES 
//                 ('Golden Valley', 'Gold Mine', -31.950527, 115.860458, 'data_migration', 'approved'),
//                 ('Silver Creek', 'Silver Mine', -33.865143, 151.209900, 'data_migration', 'approved'),
//                 ('Copper Hills', 'Copper Mine', -27.470125, 153.021072, 'data_migration', 'approved'),
//                 ('Iron Ridge', 'Iron Ore Mine', -34.928621, 138.599959, 'data_migration', 'pending'),
//                 ('Lithium Lakes', 'Lithium Processing', -37.840935, 144.946457, 'data_migration', 'new');`

//     await sql`
//                 INSERT INTO companies (company_name, asx_code, notes, created_by, approved_status)
//                 VALUES 
//                     ('Mineral Resources Ltd', 'MIN', 'Large mining company with multiple operations', 'data_migration', 'approved'),
//                     ('Gold Fields Australia', 'GFA', 'Specializes in gold mining across Australia', 'data_migration', 'approved'),
//                     ('Copper Mountain Mining', 'CMM', 'Focuses on copper extraction and processing', 'data_migration', 'approved'),
//                     ('Resource Ventures', 'RVL', 'Exploration company seeking new deposits', 'data_migration', 'pending'),
//                     ('Australian Mining Group', 'AMG', 'Diversified mining operations', 'data_migration', 'approved');`;

//     await sql`
//                 INSERT INTO commodities (commodity_name, element, units_of_measure, notes, created_by)
//                 VALUES 
//                     ('Gold', 'Au', 'oz', 'Precious metal with symbol Au', 'data_migration'),
//                     ('Silver', 'Ag', 'oz', 'Precious metal with symbol Ag', 'data_migration'),
//                     ('Copper', 'Cu', 'tonnes', 'Base metal with symbol Cu', 'data_migration'),
//                     ('Iron', 'Fe', 'tonnes', 'Industrial metal used for steel production', 'data_migration'),
//                     ('Lithium', 'Li', 'tonnes', 'Critical mineral for batteries', 'data_migration'),
//                     ('Nickel', 'Ni', 'tonnes', 'Used in stainless steel and batteries', 'data_migration'),
//                     ('Uranium', 'U', 'pounds', 'Used for nuclear energy', 'data_migration');`
    
//     await sql `
//                 INSERT INTO project_commodities (project_id, commodity_id, isPrimary, isSecondary)
//                 VALUES 
//                     -- Golden Valley primarily produces gold, with silver as secondary
//                     ((SELECT project_id FROM projects WHERE project_name = 'Golden Valley'),
//                     (SELECT commodity_id FROM commodities WHERE commodity_name = 'Gold'),
//                     TRUE, FALSE),
//                     ((SELECT project_id FROM projects WHERE project_name = 'Golden Valley'),
//                     (SELECT commodity_id FROM commodities WHERE commodity_name = 'Silver'),
//                     FALSE, TRUE),
//                     -- Silver Creek primarily produces silver
//                     ((SELECT project_id FROM projects WHERE project_name = 'Silver Creek'),
//                     (SELECT commodity_id FROM commodities WHERE commodity_name = 'Silver'),
//                     TRUE, FALSE),
//                     -- Copper Hills primarily produces copper
//                     ((SELECT project_id FROM projects WHERE project_name = 'Copper Hills'),
//                     (SELECT commodity_id FROM commodities WHERE commodity_name = 'Copper'),
//                     TRUE, FALSE),
//                     -- Iron Ridge primarily produces iron
//                     ((SELECT project_id FROM projects WHERE project_name = 'Iron Ridge'),
//                     (SELECT commodity_id FROM commodities WHERE commodity_name = 'Iron'),
//                     TRUE, FALSE),
//                     -- Lithium Lakes primarily produces lithium
//                     ((SELECT project_id FROM projects WHERE project_name = 'Lithium Lakes'),
//                     (SELECT commodity_id FROM commodities WHERE commodity_name = 'Lithium'),
//                     TRUE, FALSE);`
// }

// async function createKeyEvents() {
//     await sql `CREATE TABLE IF NOT EXISTS key_events (
//     event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     event_date DATE NOT NULL,
//     event_details text,

//     created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//     updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
// );`
// }

// async function createProjectStatuses() {
//     await sql `CREATE TABLE IF NOT EXISTS project_statuses (
//         project_id UUID PRIMARY KEY NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
//         project_status VARCHAR(255) NOT NULL,
//         status_detailed TEXT,
    
//         created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//         approved_by VARCHAR(255),
//         approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
//     );`
// }

// async function createProductions() {
//     await sql `CREATE TABLE IF NOT EXISTS productions (
//         project_id UUID NOT NULL REFERENCES projects(project_id),
//         commodity_id UUID NOT NULL REFERENCES commodities(commodity_id),
//         tonnage VARCHAR(255),
//         units_of_measurement VARCHAR(255),
//         start_date TIMESTAMP WITH TIME ZONE,
//         end_date TIMESTAMP WITH TIME ZONE,
//         notes TEXT,

//         created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//         approved_by VARCHAR(255),
//         approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

//         PRIMARY KEY (project_id, commodity_id)
//     );`
// }

// async function createAttachments() {
//     await sql `CREATE TABLE IF NOT EXISTS attachments (
//         attachment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//         link_name VARCHAR(255),
//         link_url TEXT,
//         file_name VARCHAR(255),
//         file_url TEXT,
//         notes TEXT,

//         created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//         approved_by VARCHAR(255),
//         approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
//     );`
// }

// async function createReserves() {
//     await sql `CREATE TABLE IF NOT EXISTS reserves (
//         project_id UUID NOT NULL REFERENCES projects(project_id),
//         commodity_id UUID NOT NULL REFERENCES commodities(commodity_id),
//         tonnage VARCHAR(255),
//         units_of_measurement VARCHAR(255),
//         grade VARCHAR(255),
//         estimate_date TIMESTAMP WITH TIME ZONE,
//         notes TEXT,
//         created_by VARCHAR(255) NOT NULL DEFAULT 'no-user',
//         created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         approved_status VARCHAR(255) NOT NULL DEFAULT 'new',
//         approved_by VARCHAR(255),
//         approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
//         PRIMARY KEY (project_id, commodity_id)
//     );`
// }

// // JUNCTION TABLES

// // Junction table for projects and commodities (many-to-many)
// // export async function createJunctionProjectCommodities() {
// //     await sql `CREATE TABLE IF NOT EXISTS project_commodities (
// //         project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
// //         commodity_id UUID NOT NULL REFERENCES commodities(commodity_id) ON DELETE CASCADE,
// //         isPrimary BOOLEAN NOT NULL DEFAULT FALSE,
// //         isSecondary BOOLEAN NOT NULL DEFAULT FALSE,
// //         PRIMARY KEY (project_id, commodity_id)
// //     );`
// // }

// // export async function createJunctionProjectCompanies(){
// //     await sql `CREATE TABLE IF NOT EXISTS company_projects (
// //         project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
// //         company_id UUID NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
// //         PRIMARY KEY (project_id, company_id)
// //     );`
// // } 

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            // createUsers()
            // createProjects(),
            // createCommodities(),
            // createCompanies(),
            // createKeyEvents(),
            // createProjectStatuses(),
            // createProductions(),
            // createAttachments(),
            // createReserves(),
            // createJunctionProjectCommodities(),
            // createJunctionProjectCompanies(),
            // seedData()
        ])
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }
  
