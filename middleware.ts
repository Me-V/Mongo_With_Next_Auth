import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to login page if not authenticated
  },
});

// Apply to specific routes
export const config = {
  matcher: ['/'], // Protect these routes
};
