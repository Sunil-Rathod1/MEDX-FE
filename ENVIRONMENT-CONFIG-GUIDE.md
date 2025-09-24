# MEDX Environment Configuration Guide

## Overview
I've successfully configured your Angular frontend to use a global environment configuration for backend API URLs. Now you can manage all API endpoints from a single location.

## Files Updated

### 1. Environment Files Created:
- `src/environments/environment.ts` - Development configuration
- `src/environments/environment.prod.ts` - Production configuration

### 2. Services Updated:
- `auth-service.service.ts`
- `careunit-service.service.ts`  
- `beds-service.service.ts`
- `fluids-service.service.ts`
- `medication-service.service.ts`

### 3. Angular Configuration:
- `angular.json` - Added file replacement for production builds

## How to Use

### Development Environment
- **File**: `src/environments/environment.ts`
- **Backend URL**: `http://localhost:3000/api` (for local development)
- **Usage**: Automatically used when running `ng serve`

### Production Environment  
- **File**: `src/environments/environment.prod.ts`
- **Backend URL**: `https://medx-be-d5gw.onrender.com/api` (your deployed backend)
- **Usage**: Automatically used when running `ng build --configuration=production`

## How to Change Backend URLs

### For Development:
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://your-local-backend-url/api'
};
```

### For Production:
Edit `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-backend-url/api'
};
```

## Commands

### Development (uses environment.ts):
```bash
ng serve
```

### Production Build (uses environment.prod.ts):
```bash
ng build --configuration=production
```

### Development Build:
```bash
ng build --configuration=development
```

## Benefits

1. **Single Source of Truth**: All API URLs managed in one place
2. **Environment Specific**: Different URLs for development and production
3. **Build-time Replacement**: Angular automatically replaces files during build
4. **Easy Maintenance**: Change URL in one file instead of multiple services

## Current Configuration

- **Development**: Points to `http://localhost:3000/api` (change this if your local backend runs on a different port)
- **Production**: Points to `https://medx-be-d5gw.onrender.com/api` (your current deployed backend)

You can now easily switch between local development and production backends by simply changing the URL in the respective environment file!