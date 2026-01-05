# Admin Panel Guide

## Overview
The Admin Panel allows you to manage and clear all user data in the BilinguaV2 application. This is a powerful administrative tool that should be used with caution.

## Accessing the Admin Panel

1. Log in to the application
2. From the Dashboard, click the **"Admin"** button in the top-right corner
3. You'll be taken to the Admin Panel

## Features

### Database Statistics
- View real-time statistics about your database:
  - **Auth Users**: Total number of registered users
  - **User Data Entries**: Progress and points entries in the database
  - **Leaderboard Entries**: Total leaderboard records

Click the **"Load Statistics"** button to refresh the data.

### Clear All User Data
Located in the **Danger Zone** section, this feature allows you to:
- Delete all user accounts and authentication data
- Remove all user progress and learning data
- Clear all points and leaderboard entries
- Erase all stored preferences and settings

## ⚠️ Important Warnings

1. **Irreversible Action**: Once data is deleted, it **cannot be recovered**
2. **Complete Wipe**: This deletes ALL user data, not individual users
3. **Auto Logout**: After deletion, you will be automatically logged out
4. **Confirmation Required**: You must confirm the action in a dialog before deletion proceeds

## How to Clear All Data

1. Navigate to the Admin Panel
2. Scroll to the "Danger Zone" section
3. Click **"Clear All User Data"** button
4. Read the confirmation dialog carefully
5. Click **"Yes, delete everything"** to proceed
6. Wait for the operation to complete
7. You will be logged out automatically

## Use Cases

This feature is useful for:
- Testing and development
- Resetting the application to a clean state
- Removing test data before production
- Starting fresh with a new user base

## Technical Details

### Server Endpoint
- **Route**: `POST /make-server-5a91a1cb/admin/clear-all-data`
- **Authentication**: Required (uses access token)
- **Actions**:
  1. Deletes all KV store entries with prefix `user:`
  2. Deletes all KV store entries with prefix `leaderboard:`
  3. Deletes all Supabase Auth users

### Statistics Endpoint
- **Route**: `GET /make-server-5a91a1cb/admin/stats`
- **Authentication**: Required
- **Returns**: Current database statistics

## Security

- All admin endpoints require authentication
- Only logged-in users can access the admin panel
- Operations are logged on the server with the initiating user's email

## Troubleshooting

**Issue**: "Unauthorized" error when accessing admin panel
- **Solution**: Make sure you're logged in and your session is valid

**Issue**: Data deletion fails
- **Solution**: Check the browser console for error messages. The server logs will show detailed error information.

**Issue**: Not all data was deleted
- **Solution**: Check the server logs for specific errors. Some records may have failed to delete if there were database connectivity issues.

## Notes

- The deletion operation processes all users sequentially
- Large databases may take longer to clear
- Server logs provide detailed information about the deletion process
- After clearing data, you can immediately sign up again with new accounts
