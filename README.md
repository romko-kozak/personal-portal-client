<div align='center'>
  <h1>Playground Portal</h1>

  <p>
    <img src='https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react' alt='React' />
    <img src='https://img.shields.io/badge/Redux_Toolkit-1.9.1-764ABC?style=for-the-badge&logo=redux' alt='Redux Toolkit' />
    <img src='https://img.shields.io/badge/React_Router-6.7.0-CA4245?style=for-the-badge&logo=react-router' alt='React Router' />
    <img src='https://img.shields.io/badge/Sass-1.57.1-CC6699?style=for-the-badge&logo=sass' alt='Sass' />
    <img src='https://img.shields.io/badge/React_Toastify-9.1.1-FF6F61?style=for-the-badge&logo=react-toastify' alt='React Toastify' />
    <img src='https://img.shields.io/badge/GSAP-3.11.4-88CE02?style=for-the-badge&logo=greensock' alt='GSAP' />
  </p>
</div>

## Description

Login Client is a React playground for experimenting with different components, features, and tools. It provides secure sign-in and sign-up flows, protected routes, user listing and detail pages, includes a weather widget that displays local weather based on your location, custom permissions and feature flagging functionality, styled with Sass and animated with GSAP, and all images are loaded from AWS S3. Note: this codebase is a work in progress and may not be perfectly refactored or architected.

## Key Features

<table>
<tr>
  <td width='50%'>
    <h3>User Authentication</h3>
    <p>Secure sign-in and sign-up forms with live validation.</p>
  </td>
  <td width='50%'>
    <h3>Protected Routes</h3>
    <p>Restricts access to authenticated users.</p>
  </td>
</tr>
<tr>
  <td width='50%'>
    <h3>User Management</h3>
    <p>List, view and manage user profiles.</p>
  </td>
  <td width='50%'>
    <h3>Responsive Design</h3>
    <p>Elegant UI built with Sass modules.</p>
  </td>
</tr>
<tr>
  <td width='50%'>
    <h3>Toast Notifications</h3>
    <p>Instant feedback via React Toastify.</p>
  </td>
  <td width='50%'>
    <h3>Smooth Animations</h3>
    <p>GSAP-powered transitions for enhanced UX.</p>
  </td>
</tr>
</table>

## Getting Started

### Prerequisites

- Node.js v18.x or later
- npm v9.x or later

### Installation

```bash
git clone https://github.com/romko-kozak/personal-portal-client.git
cd personal-portal-client
npm install
```

### Running Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command       | Description                       |
| ------------- | --------------------------------- |
| npm start     | Runs the app in development mode  |
| npm run build | Builds the app for production     |
| npm test      | Launches the test runner          |
| npm run lint  | Runs ESLint to check code quality |

## Technologies

<table>
<tr>
  <td align='center'><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width='40' alt='React'/><br/>React</td>
  <td align='center'><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' width='40' alt='Redux Toolkit'/><br/>Redux Toolkit</td>
  <td align='center'><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg' width='40' alt='React Router'/><br/>React Router</td>
  <td align='center'><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' width='40' alt='Sass'/><br/>Sass</td>
</tr>
</table>

## Learn More

- [Client repository](https://github.com/romko-kozak/login/tree/main/client) for full source.
- [Server documentation](https://github.com/romko-kozak/login/tree/main/server) for backend APIs.
- [React Router docs](https://reactrouter.com/) for routing patterns.
