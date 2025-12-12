# Firebase Setup Guide - Fix Contact Form Permissions

## 🚨 Current Issue
Your contact form is showing "Missing or insufficient permissions" error because Firebase Firestore has restrictive security rules by default.

## ✅ Solution: Update Firestore Security Rules

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Select your **"portfolio-bb303"** project

### Step 2: Navigate to Firestore Rules
1. In the left sidebar, click **"Firestore Database"**
2. Click on the **"Rules"** tab at the top

### Step 3: Update Security Rules
1. **Delete all existing code** in the rules editor
2. **Copy and paste** this exact code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read/write contact form submissions
    // This is safe for a contact form since it only stores basic inquiry data
    match /artifacts/{appId}/public/data/enquiries/{document} {
      allow read, write: if true;
    }
    
    // Optional: Add more restrictive rules for other collections
    // match /{document=**} {
    //   allow read, write: if false; // Deny all other access by default
    // }
  }
}
```

### Step 4: Publish Rules
1. Click the **"Publish"** button (blue button at the top)
2. Confirm by clicking **"Publish"** in the popup

## 🔍 What This Does

### ✅ Allows:
- Anonymous users to submit contact forms
- Anyone to read/write to the specific contact form collection
- Your portfolio contact form to save inquiries

### 🔒 Security Features:
- Only allows access to the specific path: `artifacts/portfolio-bb303/public/data/enquiries/`
- Other parts of your database remain protected
- Safe for contact form data (just name, email, message)

## 🧪 Test Your Setup

After publishing the rules, test your contact form:

### Method 1: Console Test
1. Open your portfolio in browser
2. Press F12 to open Developer Console
3. Run: `testContactForm()`
4. You should see: "✅ Test contact form submission successful!"

### Method 2: Manual Test
1. Fill out the contact form on your portfolio
2. Submit it
3. Check for success message
4. Verify in Firebase Console

### Method 3: Check Firebase Console
1. Go to Firestore Database in Firebase Console
2. Look for the collection path: `artifacts` → `portfolio-bb303` → `public` → `data` → `enquiries`
3. You should see your test submissions

## 🎯 Expected Result

After following these steps:
- ✅ No more "Missing or insufficient permissions" errors
- ✅ Contact form submissions save to Firebase
- ✅ Clean console output (no errors)
- ✅ Professional contact form functionality

## 🔧 If You Need Help

If you still have issues:
1. **Double-check the rules**: Make sure you copied the exact code
2. **Verify project selection**: Ensure you're in the "portfolio-bb303" project
3. **Wait for propagation**: Rules can take a few minutes to apply
4. **Check browser cache**: Refresh the page (Ctrl+F5)

## 📞 Support

Your contact form will be fully functional once these rules are published!
