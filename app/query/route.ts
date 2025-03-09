import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET: Fetch all projects
export async function GET() {
  try {
    const data = await sql`
      SELECT * FROM projects
    `;
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST: Add a new project
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const project_name = formData.get('project_name') as string;
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);

    // Insert the new project into the database
    await sql`
      INSERT INTO projects (project_name, latitude, longitude)
      VALUES (${project_name}, ${latitude}, ${longitude})
    `;

    // Redirect to the dashboard after successful submission
    return Response.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error('Error adding project:', error);
    return Response.json({ error: 'Failed to add project' }, { status: 500 });
  }
}