# 🏆 Visitors Management System (MERN Stack Assignment)

This project is a complete **Visitors Management System** developed using the **MERN stack** to fulfill the requirements of the second-round technical assignment. It features role-based access control, comprehensive visitor tracking, and data reporting.

## 🛠 Tech Stack

| Layer | Technology | Key Feature Used |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Component-based UI, Role-based Routing |
| **Backend** | Node.js / Express | RESTful API creation, Server Logic |
| **Database** | MongoDB (Mongoose) | Document storage for Users and Visitors |
| **File Upload** | Multer | Handling visitor photo uploads |
| **Reporting** | json2csv | Generating CSV reports |
| **Authentication** | Plain Text (Local Demo) | Role-based redirection on login |

---

## 🚀 Core Features Implemented

### 🔐 Authentication & Roles
-   **Login Page:** Default landing page. Role-based redirection to Admin, Security, Manager, or HR dashboards upon successful login.
-   **User Creation (Admin Only):** Admin can create new users with specific roles (`Security`, `Manager`, `HR`) via the **Role Creation** tab.
-   **Security Note:** Authentication uses **plain passwords** for demonstration purposes as per assignment instructions. 

### 🛡️ Security Role
-   **Visitor In Details Form:** Captures all required visitor information.
-   **Auto Visitor Number:** Generates unique IDs (e.g., `VN101`).
-   **Photo Upload:** Implemented using **Multer** on the backend to save the image file to the server's `uploads/` directory and save the path in the database.
-   **Visitor Out Form:** Records the Out Time and **calculates `Total Time Spent`** on the backend.
-   **Report Download:** Generates and serves a **CSV report** of all visitor logs.

### 🧑‍💼 Manager / HR Roles
-   **Visitor Meeting Update Form:** Allows updating the `meetingStatus` (Pending/Completed/Cancelled) and optionally setting the `Time Out`.
-   **Visitor List of Past:** Shows all visitors who have checked in, including their status and time spent.
-   **Photo Viewing:** Images are displayed as **clickable thumbnails** that open in a **popup modal** for quick preview.

### 🖥️ Admin Role
-   **Dashboard:** Contains tabs for Role Creation, Visitor Form Definition, and Visitor Details.
-   **Visitor Details:** Displays a comprehensive, styled table of **ALL** visitor records, including the photo path reference.

---

## 🛠 Project Structure Overview