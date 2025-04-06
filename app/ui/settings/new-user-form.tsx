'use client'
import { createUser } from "@/app/lib/writedb/write-users"


export default function NewUserForm() {
    return (
        <form className="p-3 mt-3 border-gray-200 rounded-lg border-2" action={createUser}>
            <h2>Add User</h2>
            <div className="grid grid-cols-2 gap-1">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter User's Name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        required
                    />
                </div>

                <div className="">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        name="passwordConfirm"
                        placeholder="Enter password again"
                        required
                        minLength={6}
                    />
                </div>

                <div>
                    <fieldset>
                        <legend>Permissions</legend>
                        <div className="grid grid-cols-4 gap-1">
                            <div className="flex items-center gap-1.5">
                                <input type="checkbox" id="review" name="permissions" defaultChecked/>
                                <label htmlFor="review">Review</label>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <input type="checkbox" id="analyst" name="permissions" defaultChecked/>
                                <label htmlFor="analyst">Analyst</label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <input type="checkbox" id="admin" name="permissions" />
                                <label htmlFor="admin">Admin</label>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="flex row space-x-2">
                    <button type="reset" className="w-1/8 border-gray-400 border-[1px] p-2 text-xs rounded-sm"
                            aria-disabled='false'>
                        Clear Form
                    </button>
                    <button type="submit"
                            className="w-1/4 border-[1px] bg-blue-400 p-2 text-xs font-bold text-white rounded-sm"
                            aria-disabled='false'>
                        Create User
                    </button>
                </div>
            </div>
        </form>
    )
}