# parcel_delivery

# 📦 Parcel Delivery API

A secure, modular, and role-based backend API for managing parcel deliveries — inspired by services like **Pathao Courier** and **Sundarban Courier**.  
Built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**, this system allows **senders**, **receivers**, and **admins** to interact with parcels through a structured role-based access model.

---

## Live_Link--> https://parcel-delivery2.onrender.com/

---

## 🚀 Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Password hashing using bcrypt
- Three roles: **Admin**, **Sender**, **Receiver**
- Role-based route protection middleware (`authMiddleware.ts`)

### 📦 Parcel Management

- **Sender**: Create, cancel (if not dispatched), view parcels
- **Receiver**: View incoming parcels, confirm delivery
- **Admin**: View/manage all parcels, block/unblock users or parcels, update delivery status
- Unique Tracking ID system: `TRK-YYYYMMDD-XXXXXX` (generated in `trackingId.ts`)
- Embedded **status log history** inside parcel schema
- Parcel lifecycle: `Requested → Approved → Dispatched → In Transit → Delivered`

### 🗂 Status & Tracking

- Each parcel stores a `trackingEvents[]` array:
  ```
  {
    "status": "In Transit",
    "location": "Chittagong Hub",
    "timestamp": "2025-08-12T12:30:00Z",
    "updatedBy": "Admin"
  }
  Trackable by sender or receiver
  ```

Filtering by status or delivery time

🧱 Business Rules
Senders cannot cancel dispatched parcels

Receivers can only confirm delivery once

Blocked users cannot access restricted features

Parcel ownership validation

📁 Folder Structure

```
src/

├── config/

│   └── database.ts                    # MongoDB connection setup

├── constants/

│   └── statusCodes.ts           # HTTP status codes

├── middlewares/

│   ├── authMiddleware.ts        # JWT + Role verification

│   └── errorHandler.ts          # Centralized error handling

├── modules/

│   ├── admin/

│   │   ├── admin.controller.ts

│   │   └── admin.routes.ts

│   ├── auth/

│   │   ├── auth.controller.ts

│   │   └── auth.routes.ts

│   ├── parcel/

│   │   ├── parcel.controller.ts

│   │   ├── parcel.model.ts

│   │   └── parcel.routes.ts

│   ├── reciver/

│   │   ├── receiver.controller.ts

│   │   └── receiver.routes.ts

│   └── user/

│       ├── user.controller.ts

│       ├── user.model.ts

│       └── user.routes.ts

├── utils/

│   ├── ApiError.ts

│   ├── generateToken.ts

│   └── trackingId.ts

├── app.ts                        # Express app setup

└── server.ts                     # Server entry point
```

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt
- **Validation:** Custom Validation & Middleware
- **Testing:** Postman

---

## 📜 API Endpoints

### **Auth Routes**

| Method | Endpoint         | Role | Description                       |
| ------ | ---------------- | ---- | --------------------------------- |
| POST   | `/auth/register` | All  | Register as sender/receiver/admin |
| POST   | `/auth/login`    | All  | Login & get JWT token             |

### **Sender Routes**

| Method | Endpoint                  | Description                       |
| ------ | ------------------------- | --------------------------------- |
| POST   | `/api/parcels`            | Create a new parcel               |
| GET    | `/api/parcels/me`         | View sender's parcels             |
| PATCH  | `/api/parcels/cancel/:id` | Cancel parcel (if not dispatched) |

### **Receiver Routes**

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| GET    | `/api/receiver/incoming`    | View incoming parcels |
| PATCH  | `/api/receiver/confirm/:id` | Confirm delivery      |

### **Admin Routes**

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| GET    | `/api/parcels`            | View all parcels     |
| PATCH  | `/api/parcels/status/:id` | Update parcel status |
| PATCH  | `/api/parcels/block/:id`  | Block a parcel       |
| GET    | `/api/users`              | Get all users        |
| PATCH  | `/api/users/block/:id`    | Block a user         |
| PATCH  | `/api/users/unblock/:id`  | Unblock a user       |

## 🔐 Role-Based Access

| Role         | Permissions                                              |
| ------------ | -------------------------------------------------------- |
| **Admin**    | Manage all users, view/update all parcels, block/unblock |
| **Sender**   | Create parcels, cancel before dispatch, view own parcels |
| **Receiver** | View incoming parcels, confirm delivery                  |

⚙️ Installation & Setup

1️⃣ Clone Repository

```
git clone https://github.com/your-username/parcel-delivery-api.git
cd parcel-delivery-api
```

2️⃣ Install Dependencies

```
npm install
```

3️⃣ Environment Variables

Create a .env file in the root directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/parcel_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

4️⃣ Start Server

```
npm run dev
```

Server will run on: http://localhost:5000

## 🧪 API Testing with Postman

Import the provided **Postman Collection** to test the API.

### **Test Flow**

- **Auth Flow:** Register → Login → Get Token
- **Sender Features:** Create, cancel, list parcels
- **Receiver Features:** View incoming parcels, confirm delivery
- **Admin Features:** View all parcels, block/unblock, update status

---


## 📄 License

This project is licensed under the **MIT License**.
