'use client'
import { updateUserPassword } from "@/app/lib/writedb/write-users"
import React, { useState } from "react";

export default function ChangePasswordForm({user_id}: {user_id: string}) {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(!toggle);
    };

    return (
        <div>
            <a onClick={handleClick} className={" text-orange-600 underline cursor-hand cursor-pointer"}>Reset Password</a>
            { toggle ?
            // @ts-ignore
            <form id={`password-form-${user_id}`} action={updateUserPassword}>
                <fieldset className="flex flex-row">
                    <legend>Reset password</legend>
                    <input type="text" id="user_id" name={"user_id"} value={user_id} readOnly={true} hidden />
                    <label>New Password</label>
                    <input type='text' id="password" name="password" minLength={6} required />
                    <label>confirm Password</label>
                    <input type='text' id="confirmPassword" name="confirmPassword" minLength={6} required />
                    <button>Change</button>

                </fieldset>
            </form> : <></>}
        </div>
    )
}