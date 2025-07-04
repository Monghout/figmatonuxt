import { User } from "firebase/auth";

declare module "#app" {
  interface NuxtApp {
    $auth: ReturnType<typeof useAuth>;
  }
}
