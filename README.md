# 📝 XPress Rewards

This project is designed to handle the registration, login, and dashboard functionalities for users of Xpress Rewards. It consists of the following key features:

User Registration: Users sign up by providing their business information, business address, and contact person information. They also create a password for secure login.
User Login: Users can log in using the email and password they provided during registration.
Dashboard: The dashboard is a view where partners can see the status of their verifiers (active, deactivated, awaiting activation). The dashboard displays this data in a table format, providing insights into their partners’ reward statuses.

## 🚀 Tech Stack

This project is built with:

- React (Next.js) – Frontend framework
- TypeScript – Strongly typed JavaScript
- React Context API – State management for authentication
- Zod – Schema validation
- React Hook Form – Form handling
- TanStack Table (React Table) – Data table with pagination
- Tailwind CSS / ShadCN – UI styling
- LocalStorage – Persistent authentication
- ESLint, Prettier – Code quality & formatting

## 📦 Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/Kaempy/xpress

# Navigate to the project folder
cd xpress

# Install dependencies
pnpm install  # or npm install / yarn install

# Start the development server
pnpm dev  # or npm run dev / yarn dev
```

## 🔑 Authentication Flow

🔹 Signup Required

- To experience the full authentication flow, users must sign up first. Only registered users can log in.

🔹 How It Works

- Upon signup, user details are stored in LocalStorage.
- When logging in, the credentials are checked against the stored data.
- A mock token is generated and stored in LocalStorage for session persistence.
- Users can log out, which clears the stored authentication data.

## ✅ Features

- [x] 🔹 User Signup & Login – Authentication with LocalStorage
- [x] 🔹 Persistent Login – Maintains user session
- [x] 🔹 Protected Routes – Restricts access to authenticated users
- [x] 🔹 Table with Pagination & Filtering – Dynamic table with sorting and search
- [x] 🔹 State Management – React Context API

## 🛠️ Commands

```sh
pnpm lint # Run ESLint
pnpm format # Format code using Prettier
pnpm build # Build the production-ready app
pnpm test # Run tests
```
