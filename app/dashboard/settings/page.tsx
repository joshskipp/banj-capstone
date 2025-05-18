import {fetchAllUsers, fetchUserCount} from "@/app/lib/data";
import { CommandLineIcon } from '@heroicons/react/24/outline';
import NewUserForm from '@/app/ui/settings/new-user-form';
import CurrentUser from '@/app/ui/settings/current-user';
import ChangePasswordForm from '@/app/ui/settings/change-password'
import ChangePermissionForm from "@/app/ui/settings/change-permissions";
import { activeSession } from "@/app/lib/utils/activeSession";
import { getPermissions } from "@/app/lib/utils/getPermissions";


export default async function Page() {
    const allUsers = await fetchAllUsers();
    const userCount = await fetchUserCount();

    const user = await CurrentUser();
    const currentUser = await activeSession();

    const u_per = await getPermissions(currentUser?.id || '');

    return (
        <div className="flex flex-col gap-10">

            {/* User Settings */}
            <div className="border-2 rounded-xl overflow-hidden">
                <div className="flex items-center p-1 pl-2 gap-2 bg-[#214656] text-white">
                    {/* <CommandLineIcon className="w-8"/> */}
                    <h3>User Settings</h3>
                </div>

                <div className="p-2 flex flex-row justify-between">
                    <div>
                        <h3>{user?.name}</h3>
                        <ul className="list-disc list-inside">
                            <li><b>ID:</b> {user?.id}</li>
                            <li><b>Name:</b> {user?.name}</li>
                            <li><b>Login Email:</b> {user?.email}</li>
                        </ul>

                        {user?.id && <ChangePasswordForm user_id={user.id} />}
                    </div>
                <div className="p-2">
                    <h4>Permissions</h4>
                    <p> Your role is assigned by the administrator.</p>
                    <p className="m-4 align-center">
                {/*  Display permissions */}
                { Object.entries(u_per).map(([type, value]) => {
                if (value === true) {
                    return <span key={type} className="p-2 bg-gray-300 rounded text-sm uppercase m-1">{type}</span>
                }
                return null;
                })}
                </p>
                </div>

                </div>
            </div>

            {/* User Role Check: Admins can see Application Settings */}

            { u_per.admin == true ? (                
                <div className="border-2 rounded-xl overflow-hidden">
                <div className="flex items-center p-1 pl-2 gap-2 bg-[#214656] text-white">
                    <CommandLineIcon className="w-8"/>
                    <h3>Admin Settings</h3>
                </div>

                <div className="p-2">

                <p>Total users: {userCount}</p>
                <p><strong>List of all users</strong></p>
                { allUsers.map(user => (
                    <div key={user.id} className="p-2 bg-gray-200 bg-opacity-35 rounded-lg hover:bg-white">
                        <p><strong>{user.name}</strong> ({user.email}) <br />
                        <small>{user.id}</small></p>
                        {user.name != "system-nouser" ?
                        <div><ChangePasswordForm user_id={user.id} />
                        <ChangePermissionForm user_id={user.id} user_permissions={user.permissions} /></div>
                        : <p>Cannot change password for this user.</p>
                        }
                        <small><b>Permissions:</b> {JSON.stringify(user.permissions)}</small>
                    </div>
                ))}
                    <NewUserForm />
                </div>
                </div>
                
                ) : (
                <> </>
                )}
            
        </div>
    )
}