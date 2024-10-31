import React, { useContext, useEffect, useState } from 'react';
import './UserProfile.css';
import { StoreContext } from '../../context/ContextStore';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserProfile = () => {
    const { userDetails, updateUserDetails, fetchUserDetails, // Add fetchUserDetails here
    } = useContext(StoreContext);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordChange, setIsPasswordChange] = useState(false);

    // Fetch user details on component mount
    useEffect(() => {
        if (userDetails) {
            setFormData(userDetails); // Set form data when userDetails changes
        }
        else {
            fetchUserDetails(); // Fetch if userDetails is null
        }
    }, [userDetails, fetchUserDetails]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserDetails(formData); // Wait for backend response
            if (response.success) {
                toast.success("Profile updated successfully!");
                setIsEditing(false); // Exit edit mode if successful
            } else {
                toast.error(response.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while updating your profile.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Personal Information</h2>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="form-group toggle-container">
                            <label className="toggle-label">Change Password</label>
                            <div className={`toggle-button ${isPasswordChange ? 'active' : ''}`} onClick={() => setIsPasswordChange(!isPasswordChange)}>
                                <div className={`toggle-circle ${isPasswordChange ? 'active' : ''}`}></div>
                            </div>
                        </div>
                        <div className={`password-fields ${isPasswordChange ? 'active' : ''}`}>
                            <div className="form-group">
                                <label>Old Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    onChange={handleChange}
                                    placeholder="Old Password"
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    onChange={handleChange}
                                    placeholder="New Password"
                                />
                            </div>
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn-submit">Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-info">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <button onClick={() => setIsEditing(true)} className="btn-edit">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
