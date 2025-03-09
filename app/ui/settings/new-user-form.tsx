'use client'

import {AtSymbolIcon, KeyIcon, UserIcon} from "@heroicons/react/24/outline";

export default function NewUserForm() {
    return (
        <form className="p-3 mt-3 border-gray-200 rounded-lg border-2">
            <h2>Add User</h2>
            <div className="w-full space-y-2">
                <div>
                    <label
                        className="block text-xs font-medium text-gray-900"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="name"
                            type="text"
                            name="text"
                            placeholder="Enter User's Name"
                            required
                        />
                        <UserIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>
                <div>
                    <label
                        className="block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                        <AtSymbolIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>
                <div className="">
                    <label
                        className="block text-xs font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            minLength={6}
                        />
                        <KeyIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                    <label
                        className="block text-xs font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password-confirm"
                            type="password"
                            name="password-confirm"
                            placeholder="Enter password again"
                            required
                            minLength={6}
                        />
                        <KeyIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                    <div className="flex row space-x-2 pt-4">
                    <button type="reset" className="w-1/8 border-gray-400 border-[1px] p-2 text-xs rounded-sm" aria-disabled='false'>
                        Clear Form
                    </button>
                    <button type="submit" disabled className="w-1/4 border-[1px] bg-blue-400 p-2 text-xs font-bold text-white rounded-sm hover:cursor-not-allowed" aria-disabled='true'>
                        Create User
                    </button>
                    </div>
                </div>
            </div>
        </form>
    )
}