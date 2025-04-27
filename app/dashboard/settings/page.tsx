import {fetchAllUsers, fetchUserCount} from "@/app/lib/data";
import { CommandLineIcon } from '@heroicons/react/24/outline';
import NewUserForm from '@/app/ui/settings/new-user-form';
import CurrentUser from '@/app/ui/settings/current-user';
import ChangePasswordForm from '@/app/ui/settings/change-password'

export default async function Page() {
    const allUsers = await fetchAllUsers();
    const userCount = await fetchUserCount();

    const user = await CurrentUser();

    return (
        <div className="flex flex-col gap-10">

            <div>
                <p>Hello <strong>{user?.name}</strong></p>
            <h2>Settings</h2>
            <p>Regular settings goes here</p>
            </div>


            <div className="border-2 rounded-xl overflow-hidden">
                <div className="flex items-center p-1 pl-2 gap-2 bg-[#214656] text-white">
                    <CommandLineIcon className="w-8"/>
                    <h3>Dev Settings....</h3>
                </div>

                <div className="p-2">
                <p>Proceed with Caution</p>

                <h4>Users</h4>
                <p>Total users: {userCount}</p>
                <p><strong>List of all users</strong></p>
                { allUsers.map(user => (
                    <div key={user.id} className="p-2 bg-gray-200 bg-opacity-35 rounded-lg hover:bg-white">
                        <p><strong>{user.name}</strong> ({user.email}) <br />
                        <small>{user.id}</small></p>
                        {user.name != "system-nouser" ?
                        <ChangePasswordForm user_id={user.id} />
                        : <p>Cannot change password for this user.</p>
                        }
                    </div>
                ))}
                    <h4>New User</h4>
                    <NewUserForm />
                </div>
                </div>
        </div>
    )
}