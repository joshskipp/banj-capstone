'use client'
import React, { useReducer, useState } from "react";
import { updateUserPermissions } from "@/app/lib/writedb/write-users";

export default function ChangePermissionForm({user_id, user_permissions}: {user_id: string, user_permissions:{reviewer:boolean, anyalyst:boolean, admin:boolean}}) {
    const [toggle, setToggle] = useState(false);
    const [permissions, setPermissions] = useState(user_permissions || {
        reviewer: false,
        anyalyst: false,
        admin: false
    });

    const handleClick = () => {
        setToggle(!toggle);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const permissionName = name.replace('permissions-', '');
        setPermissions(prev => ({
            ...prev,
            [permissionName === 'review' ? 'reviewer' : 
             permissionName === 'analyst' ? 'anyalyst' : 
             'admin']: checked
        }));
    };

    return (
        <div>
            <a onClick={handleClick} className={" text-orange-600 underline cursor-hand cursor-pointer"}>Change Permissions</a>
            { toggle ?
            <form action={updateUserPermissions}>
                <input hidden name="user-id" value={user_id} readOnly></input>
            <fieldset>
            <legend>Permissions</legend>
            <div className="grid grid-cols-4 gap-1">
                <div className="flex items-center gap-1.5">
                    <input type="checkbox" id="review" name="permissions-review" checked={permissions.reviewer} onChange={handleChange}/>
                    <label htmlFor="review">Review</label>
                </div>

                <div className="flex items-center gap-1.5">
                    <input type="checkbox" id="analyst" name="permissions-analyst" checked={permissions.anyalyst} onChange={handleChange}/>
                    <label htmlFor="analyst">Analyst</label>
                </div>
                <div className="flex items-center gap-1.5">
                    <input type="checkbox" id="admin" name="permissions-admin" checked={permissions.admin} onChange={handleChange} />
                    <label htmlFor="admin">Admin</label>
                </div>
                <button>Change</button>
            </div>
            </fieldset></form>
            : <></>}
        </div>
    )
}