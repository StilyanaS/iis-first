# IIS Project

A modern Angular 18 web application featuring:
- Firebase integration (storage, authentication)
- Angular signals and standalone components
- Custom calendar, loader, and service details modules
- Responsive design with Angular Material and custom SCSS

---
## Preview

You can access the app preview on this link:
https://9000-firebase-integratedsystems-1752053112120.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/?monospaceUid=875042&embedded=0
---
## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Usage](#usage)
- [Custom Validators](#custom-validators)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Firebase Storage**: Fetch and display images from Firebase.
- **Service Details**: Dynamic service descriptions and images.
- **Loader**: Global loader for navigation and data fetching.
- **Calendar**: Interactive calendar with slot reservation.
- **Custom Email Validator**: Ensures realistic email addresses.
- **Responsive UI**: Mobile-friendly navigation and layouts.
- **Angular Signals**: Modern state management.
- **Standalone Components**: Modular and scalable architecture.

---

## Tech Stack

- [Angular 18](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Angular Calendar](https://github.com/mattlewis92/angular-calendar)
- [Firebase](https://firebase.google.com/)
- [RxJS](https://rxjs.dev/)
- [SCSS](https://sass-lang.com/)

---

## Setup & Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd iis-project
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up Firebase**
   - Add your Firebase config to `environment.ts` and `environment.prod.ts`.

4. **Run the development server**
   ```sh
   ng serve
   ```
   Visit [http://localhost:4200](http://localhost:4200).

---

## Development

- **Standalone Components**: All major features are implemented as standalone components for modularity.
- **Signals**: State is managed using Angular signals for reactivity.
- **Loader**: The loader is shown during route navigation and data fetching.
- **Custom Validators**: The `realisticEmail` directive ensures emails have a dot in the domain.

---

## Usage

- **Service Details**:  
  Displays a list of services with images and descriptions fetched from Firebase.
- **Calendar**:  
  Users can view available slots and reserve times.
- **Banner**:  
  Includes a subscription form with custom email validation.

---

## Custom Validators

**Realistic Email Validator**  
Ensures the email contains a dot in the domain (e.g., `user@domain.com`).
---

## Troubleshooting

- **Dependency Errors**:  
  Ensure all Angular packages are on version 18.x.  
  If you see `ERESOLVE` errors, run:
  ```sh
  npm install @angular/localize@18
  ```

- **Loader Hides Too Early**:  
  The loader is tied to route navigation. For data-dependent loading, control the loader in your component after data is fetched.

- **Calendar Not Recognized**:  
  Make sure `CalendarModule` from `angular-calendar` is imported in your standalone component or NgModule.

- **ngModel Errors**:  
  Ensure `FormsModule` is imported in any standalone component using `ngModel`.


---

**Made with Angular 18, Firebase, and ❤️**
