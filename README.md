# React Image Rearrange app Frontend

A frontend application built using React and Vite for drag-and-drop interactions, connected to a Python Starlette backend for managing image data. The app efficiently handles frequent save operations and displays the time elapsed since the last save.

### Deployed URL

https://react-image-rearrange-new.vercel.app/

## Table of Contents
- [Project Overview](#project-overview)
- [Project setup](#setting-up-the-project)
- [API Endpoints](#api-endpoints)
- [Database Information](#database-information)
- [Contributors](#contributors)

## Project Overview

This is the frontend interface for the Image Rearrange application, built with React and Vite. It uses DnD Kit for drag-and-drop interactions. It connects to a backend API to manage image data and positions.

[![Version](https://img.shields.io/badge/version-1.0.0.alpha.1-blue.svg)](https://semver.org)

### Key Features:
- **Drag and Drop**: Built using dnd-kit for drag-and-drop functionality.
- **API Integration**: Calls the backend API to fetch and save image data via a service layer.
- **Efficient Saving**:
  - Automatically saves changes every 5 seconds.
  - Only triggers save API calls when changes are detected.
- **Live Timer**: Displays the time elapsed since the last successful save.
- **Modern React**: Utilizes React hooks (useState, useEffect, useRef, etc.) for state and lifecycle management.

---

## Setting Up the Project

### Tech stack
- **Frontend Framework**: React
- **Drag-and-Drop Library**: DnD-kit
- **State Management**: React hooks (useState, useEffect, useRef)
- **Deployment**: Vercel

### Installation
**Prerequisites**:
- Node.js v20+
- Yarn or npm

**Clone the repository**:

    git clone https://github.com/Madhav-77/react-image-rearrange.git
    
**Create a Virtual Environment**:
    
    python3 -m venv venv
    use venv\Scripts\activate # For Windows
    
**Install Dependencies**:

    npm install
    # or
    yarn install

**Start the development server**:

    npm run dev
    # or
    yarn dev

**Environment Variables**:

Set up the environment variables in a .env file in the root directory.

    VITE_API_BASE_URL=https://python-image-rearrange-ofkj4d47u-madhav-trivedis-projects.vercel.app/api

**Run the Development Server**:

    uvicorn app.main:app --reload

## Contributors

- [@madhavtrivedi](https://www.madhavtrivedi.com/)