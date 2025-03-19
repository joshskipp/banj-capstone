import postgres from 'postgres';
import { fetchProjectById } from '@/app/lib/data'; // YES, I fully understand how jank this is

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

// DELETE: Remove a project by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return Response.json({ error: "Project ID is required" }, { status: 400 });
    }

    await sql`
      DELETE FROM projects WHERE project_id = ${projectId}
    `;

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}


// PUT: Update an existing project
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { project_id, project_name, latitude, longitude } = body;

    if (!project_id || !project_name || isNaN(latitude) || isNaN(longitude)) {
      return Response.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    // Ensure project exists before updating
    const existingProject = await fetchProjectById(project_id);
    if (!existingProject) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    // Update the project in the database
    await sql`
      UPDATE projects
      SET project_name = ${project_name}, latitude = ${latitude}, longitude = ${longitude}
      WHERE project_id = ${project_id}
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}