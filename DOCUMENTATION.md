# E-commerce Frontend Documentation

## Project Overview

This is a modern e-commerce frontend application built with React.js and various supporting libraries. The application provides a comprehensive online shopping experience with features like product browsing, cart management, user authentication, and secure payment processing.

## Tech Stack

-   **Core Framework:** React.js (v18)
-   **State Management:** Redux Toolkit
-   **Routing:** React Router DOM (v6)
-   **Styling:**
    -   Tailwind CSS
    -   Material Tailwind
    -   Emotion
-   **UI Components:**
    -   Material-UI (MUI)
    -   Radix UI
    -   Ant Design
-   **Payment Integration:**
    -   Flutterwave
    -   Paystack
-   **Form Handling:** React Hook Form
-   **HTTP Client:** Axios
-   **Notifications:** React Hot Toast
-   **Loading States:**
    -   React Content Loader
    -   React Loading Skeleton
    -   React Spinners

## Project Structure

```
src/
├── App.js                 # Main application component
├── index.js              # Application entry point
├── assets/               # Static assets (fonts, icons, images, videos)
├── AuthContext/          # Authentication context and related logic
├── components/           # Reusable UI components
│   ├── account/         # Account-related components
│   ├── admin/          # Admin dashboard components
│   ├── common/         # Shared/common components
│   ├── home/          # Homepage components
│   ├── modals/        # Modal components
│   ├── newarrivals/   # New arrivals section components
│   └── product/       # Product-related components
├── hook/                # Custom React hooks
├── libs/                # Utility libraries and constants
├── pages/               # Page components
├── services/           # API services and data fetching
├── store/              # Redux store configuration
└── utils/              # Utility functions and helpers
```

## Key Features

1. **User Authentication**

    - User registration and login
    - Password reset functionality
    - JWT-based authentication

2. **Product Management**

    - Product listing and details
    - Product categories
    - Image zoom functionality
    - New arrivals section

3. **Shopping Experience**

    - Shopping cart functionality
    - Checkout process
    - Multiple payment options (Flutterwave, Paystack)

4. **User Interface**

    - Responsive design
    - Loading states and animations
    - Toast notifications
    - Modal dialogs
    - Cookie banner

5. **Account Management**
    - User profile
    - Order history
    - Account settings

## Available Pages

-   Home (`/`)
-   Product Listings (`/products`)
-   Product Details (`/product/:id`)
-   Cart (`/cart`)
-   Checkout (`/checkout`)
-   Account Creation (`/create-account`)
-   Login (`/login`)
-   About (`/about`)
-   Contact (`/contact`)
-   FAQs (`/faqs`)
-   Legal & Privacy (`/legal-privacy`)
-   Report Scam (`/report-scam`)

## Custom Hooks

1. `useDebounce` - Implements debouncing functionality
2. `useMediaQuery` - Handles responsive design breakpoints
3. `usePageTitle` - Manages page titles
4. `useSendEmailMutation` - Email functionality
5. `useSubscribeMutation` - Newsletter subscription
6. `useTypedSelector` - Type-safe Redux selector
7. `useUpdatingItems` - Manages item updates

## Components

1. **Common Components**

    - `CartProduct` - Shopping cart item component
    - `CookieBanner` - GDPR compliance banner
    - `ImageZoom` - Product image zoom functionality
    - `PasswordInput` - Secure password input field
    - `ScrollToTop` - Scroll management component

2. **Layout Components**
    - Navigation
    - Footer
    - Sidebars
    - Header

## State Management

The application uses Redux Toolkit for state management, handling:

-   User authentication state
-   Shopping cart state
-   Product data
-   UI state (modals, notifications)

## UI/UX Features

-   AOS (Animate On Scroll) for scroll animations
-   Skeleton loaders for loading states
-   Toast notifications for user feedback
-   Modal dialogs for important actions
-   Responsive design for all screen sizes

## Security Features

-   JWT token-based authentication
-   Secure password handling
-   Protected routes
-   CORS protection
-   Form validation

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Environment Setup

1. Copy the environment example file to create your local environment file:

    ```bash
    cp .env.example .env
    ```

2. Configure the following environment variables in your `.env` file:
    - `REACT_APP_API_URL`: Backend API URL
    - `REACT_APP_WALLX_MERCHANT_ID`: WallX merchant identifier
    - `REACT_APP_FIXER_API_KEY`: API key for currency conversion
    - `REACT_APP_FLUTTERWAVE_SECRET_KEY`: Flutterwave secret key
    - `REACT_APP_FLUTTERWAVE_PUBLIC_KEY`: Flutterwave public key
    - `REACT_APP_FLUTTERWAVE_ENCRYPTION_KEY`: Flutterwave encryption key
    - `REACT_APP_PAYSTACK_PUBLIC_KEY`: Paystack public key
    - `REACT_APP_ENVIRONMENT`: Environment setting (TEST/PROD)
    - `REACT_APP_GPAY_MERCHANT_ID`: Google Pay merchant ID
    - `REACT_APP_GPAY_MERCHANT_NAME`: Google Pay merchant name

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint:fix

# Build for production
npm run build

# Serve production build locally
npm run serve
```

### Maintenance Tasks

1. **Dependency Updates**

    ```bash
    # Check for outdated dependencies
    npm outdated

    # Update all dependencies to their latest versions
    npm update

    # Update a specific package
    npm update [package-name]
    ```

2. **Cache Clearing**

    ```bash
    # Clear npm cache
    npm cache clean --force

    # Clear React's cache
    rm -rf node_modules/.cache
    ```

3. **Troubleshooting**

    ```bash
    # Remove node_modules and reinstall
    rm -rf node_modules
    rm package-lock.json
    npm install

    # Clear build directory
    rm -rf build/
    ```

### Development Best Practices

1. **Code Quality**

    - Run linter before committing: `npm run lint`
    - Ensure all tests pass: `npm test`
    - Follow the project's coding style guide
    - Use meaningful component and variable names

2. **Performance**

    - Lazy load components when possible
    - Optimize images before committing
    - Use React.memo() for expensive computations
    - Monitor bundle size using `npm run analyze`

3. **State Management**

    - Use Redux DevTools for debugging
    - Keep Redux actions and reducers organized
    - Document any new Redux state additions

4. **Testing**

    - Write tests for new features
    - Maintain good test coverage
    - Test across different browsers
    - Test responsive designs

5. **Version Control**
    - Create feature branches from develop
    - Keep commits atomic and well-described
    - Follow conventional commit messages
    - Regularly rebase with develop branch

### Deployment Checklist

1. Environment Configuration

    - Verify all environment variables are set
    - Check API endpoints are correct
    - Ensure payment gateway credentials are valid

2. Build Process

    - Run tests: `npm test`
    - Create production build: `npm run build`
    - Test production build locally: `npm run serve`

3. Performance Verification

    - Run Lighthouse audit
    - Check bundle size
    - Verify lazy loading
    - Test load times

4. Security Checks
    - Audit dependencies: `npm audit`
    - Fix security issues: `npm audit fix`
    - Review API key usage
    - Check for exposed secrets

### Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables
4. Start the development server:
    ```bash
    npm start
    ```

### Building for Production

```bash
npm run build
```

## Contributing

1. Follow the project's coding standards
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Submit pull requests with detailed descriptions

## Support and Contact

For support or questions, please refer to the contact page or submit issues through the appropriate channels.

## License

Refer to the LICENSE file in the root directory for licensing information.
