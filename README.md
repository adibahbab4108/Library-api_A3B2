# 📚 Library Management API

A RESTful API built using **Express**, **TypeScript**, and **MongoDB (Mongoose)** to manage books and borrowing in a library system.

---

## 🚀 Features

- 📘 Book Management (CRUD)
- 📖 Borrowing System with business logic
- 📊 Borrowed books summary using aggregation
- ✅ Schema validation & custom error handling
- 🧠 Mongoose middleware, static & instance methods
- 🔎 Filtering, sorting, and pagination

---

## 🛠 Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- ts-node-dev for development

---

## 🧾 API Endpoints with proper error handling and validation

### 1. 📘 Create a Book
### 2. Get All book
### 3. Get book by Id
### 4. Update book
### 5. Delete book
### 5. Borrow book (deduct count from bookCollection and save borrowbook data)
### 6. Get borrowed book
### 7. Get full summary of the  borrowed books and so on