import { useAuth } from "~/composible/useAuth";

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth();

  // Routes that don't require authentication
  const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"];

  // If not authenticated and trying to access protected route
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo("/auth/login");
  }

  // If authenticated and trying to access auth pages
  if (user.value && publicRoutes.includes(to.path)) {
    return navigateTo("/dashboard");
  } // If logged in and trying to access auth pages
  if (user.value && to.path.startsWith("/auth")) {
    return navigateTo("/");
  }

  // If not logged in and trying to access protected pages
  if (!user.value && !to.path.startsWith("/auth")) {
    return navigateTo("/auth/login");
  }
});
