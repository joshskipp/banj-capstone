'use server';
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function fetchAllProjects() {
  try{
    const
        data = await sql`
      SELECT * FROM projects
      WHERE approved_status != 'Archived'`
    return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all projects data.');
  }
}

export async function fetchAllArchivedProjects() {
  try{
    const
        data = await sql`
      SELECT * FROM projects
      where approved_status = 'Archived';`
    return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all projects data.');
  }
}

export async function fetchAllProjectsData() {
  try{
    const
        data = await sql`
            SELECT
                p.*,
                STRING_AGG(co.company_name, ', ') AS company,
                STRING_AGG(DISTINCT CASE WHEN pc.isprimary THEN c.commodity_name END, ', ') AS primary_commodities,
                STRING_AGG(DISTINCT CASE WHEN pc.issecondary THEN c.commodity_name END, ', ') AS secondary_commodities,
                (
                    SELECT json_agg(json_build_object(
                            'commodity', c.commodity_name,
                            'tonnage', r.tonnage,
                            'units', r.units_of_measurement,
                            'grade', r.grade,
                            'estimate_date', r.estimate_date,
                            'notes', r.notes
                                    ))
                    FROM reserves r
                             JOIN commodities c ON r.commodity_id = c.commodity_id
                    WHERE r.project_id = p.project_id
                ) AS reserves,
                (
                    SELECT json_agg(json_build_object(
                            'commodity', c.commodity_name,
                            'tonnage', pr.tonnage,
                            'units_of_measurement', pr.units_of_measurement,
                            'start_date', pr.start_date,
                            'end_date', pr.end_date,
                            'notes', pr.notes
                                    ))
                    FROM productions pr
                             JOIN commodities c ON pr.commodity_id = c.commodity_id
                    WHERE pr.project_id = p.project_id
                ) AS productions
            FROM  projects p
                      LEFT JOIN project_commodities pc ON p.project_id = pc.project_id
                      LEFT JOIN commodities c ON pc.commodity_id = c.commodity_id
                      LEFT JOIN company_projects cop ON p.project_id = cop.project_id
                      LEFT JOIN companies co ON cop.company_id = co.company_id
            WHERE p.approved_status != 'Archived'
            GROUP BY p.project_id;
            `
    return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all projects data.');
  }
}

export async function fetchAllUsers() {
    try {
        const data = await sql`
        SELECT * FROM users`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all users.');
    }
}

export async function fetchUserCount() {
    try {
        const data = await sql`
        SELECT COUNT(*) FROM users`
        return Number(data[0].count ?? '0');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user count.');
    }
}

export async function fetchAllCompanies() {
    try {
        const data = await sql`SELECT * FROM companies`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch companies.');
    }
}

export async function fetchAllEvents() {
  try {
      const data = await sql`SELECT * FROM key_events`
      return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch events.');
  }
}

export async function fetchAllCommodities() {
    try {
        const data = await sql`
            SELECT * FROM commodities`
        return data;
    } catch (e){
         console.error('Database Error:', e);
         throw new Error('Failed to fetch all commodities.');
    }
}

export async function fetchCommodityProjects(id: string) {
    try {
        const data = await sql`
            select pc.project_id, pc.isprimary, pc.issecondary, projects.project_name, pc.commodity_id
            from project_commodities as pc
            inner join Projects on pc.project_id = projects.project_id
            where commodity_id = ${id};`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch projects for commodity.');
    }

}

export async function fetchCommodityById(id: string) {
    try {
        const data = await sql`
            SELECT * FROM commodities WHERE commodity_id=${id};`
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to fetch commodity with id ${id}.`);
    }
}

export async function fetchProjectById(id: string) {
    try {
      const [project] = await sql`
        SELECT * FROM projects
        WHERE project_id = ${id}
      `;
      return project || null; // Return the first result or null if not found
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error('Failed to fetch project');
    }
  }

// Directly for each project
  export async function fetchAttachmentsByProjectId(projectId: string) {
    try {
      const data = await sql`
        SELECT * FROM attachments WHERE project_id = ${projectId}
      `;
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch attachments');
    }
  }

export async function fetchProjectsCommoditites(id: string) {
    try {
        const data = await sql`
            select pc.project_id, pc.isprimary, pc.issecondary, commodities.commodity_name, pc.commodity_id
            from project_commodities as pc
            inner join Commodities on pc.commodity_id = commodities.commodity_id
            where pc.project_id = ${id};
            `
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch projects for commodity.');
    }

}

const ITEMS_PER_PAGE = 100;

export async function fetchFilteredProjects(
    query: string,
    currentPage: number,  ) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const projects = await sql`
        SELECT * FROM projects
        WHERE
          projects.project_name ILIKE ${`%${query}%`} OR
          projects.product ILIKE ${`%${query}%`} 
        ORDER BY projects.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return projects;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch projects.');
    }
}
  
  
export async function fetchProjectsPages(query: string) {
      try {
        const data = await sql`SELECT COUNT(*)
        FROM projects
        WHERE
          projects.project_name ILIKE ${`%${query}%`} OR
          projects.product ILIKE ${`%${query}%`} 
      `;
    
        const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
        return totalPages;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of projects.');
      }
}

export async function fetchFilteredCompanies(
  query: string,
  currentPage: number,  ) {

  try {
    const companies = await sql`
      SELECT * FROM companies
      WHERE
        companies.company_name ILIKE ${`%${query}%`}
      ORDER BY companies.updated_at DESC
    `;

    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchFilteredKeyEvents(
  query: string,
  currentPage: number,  ) {

  try {
    const key_events = await sql`
      SELECT * FROM key_events
      WHERE
        key_events.event_name ILIKE ${`%${query}%`}
      ORDER BY key_events.event_date DESC
    `;

    return key_events;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function fetchKeyEventById(id: string) {
  try {
      const data = await sql`
          SELECT key_events.*, u.name
                 FROM key_events
                INNER JOIN Users u on u.id = key_events.created_by::uuid
                 WHERE event_id=${id};`
      return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error(`Failed to fetch commodity with id ${id}.`);
  }
}
