import React from 'react';

function ChangePassword() {
    return (
        <div className="p-4 border rounded">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form>
                <div className="mb-4">
                    <label className="block mb-2">Current Password</label>
                    <input type="password" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">New Password</label>
                    <input type="password" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Confirm New Password</label>
                    <input type="password" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
