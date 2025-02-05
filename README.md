![Smart-City_Logo](https://github.com/user-attachments/assets/dfe3b484-c765-4212-82ab-e1f64f9f9e09)

# 🚦 Smart City Traffic Management System (Smart-City-TMS)

## Overview
**Smart-City-TMS** is a real-time traffic monitoring and management system that enhances urban mobility by integrating **live traffic data, event-driven messaging, and WebSockets** for seamless updates. It utilizes **London Traffic APIs, Kafka, WebSockets, .NET Core, and a React.js dashboard** to deliver up-to-date traffic insights.

## 🔹 Features
- **Real-Time Traffic Monitoring** – Fetches **live road conditions, disruptions, and bus line updates** using **London Traffic APIs**.
- **Kafka-Based Data Exchange** – Uses **Apache Kafka** for high-speed, reliable, and scalable message streaming.
- **WebSocket Communication** – Pushes real-time traffic alerts from the backend to the **React.js dashboard**.
- **.NET Core Backend** – Handles **traffic data processing, event-driven architecture, and WebSocket connections**.
- **Interactive Dashboard** – Provides **visualized traffic insights, road disruptions, and transport updates**.

## 🛠️ Tech Stack
- **Frontend:** React.js, Chart.js, Material-UI
- **Backend:** .NET Core, ASP.NET WebSockets
- **Messaging:** Apache Kafka
- **APIs:** London Traffic APIs
- **Database:** PostgreSQL (if applicable)
- **Deployment:** Docker, Kubernetes (if applicable)

## 🚀 Getting Started

### 1️⃣ Prerequisites
- .NET SDK
- Node.js & npm
- Apache Kafka & Zookeeper
- Docker (if using containerization)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/Smart-City-TMS.git
cd Smart-City-TMS
---------------Backend----------------
cd backend
dotnet restore
dotnet run
docker-compose up -d //If using docker
---------------Frontend---------------
cd frontend
npm install
npm start
```



