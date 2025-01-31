import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/api/webhooks/clerk', '/api/webhooks/stripe']);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return; // Allow webhooks to pass through
  }
  
  auth(); // Ensure authentication for other routes
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
