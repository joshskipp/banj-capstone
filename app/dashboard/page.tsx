import { fetchAllProjects  } from "@/app/lib/data"

export default async function Page(){
    const AllProjects = await fetchAllProjects();

    return (
        <div>
            <h2><strong>Dashboard</strong></h2>
            <h3><strong>Project List</strong></h3>

            {AllProjects.map((project, i) => {
                return (
                    <div key={project.project_id} className="p-2 b-1 b-black">

                        <strong>{project.project_name}</strong><br />
                        <small>{project.project_id}</small><br />
                        {project.latitude}, {project.longitude}
                    </div>
                )
            })}
        </div>
    )
}