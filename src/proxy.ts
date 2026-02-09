// COMPONENTS //
import { NextResponse, type NextRequest } from "next/server";

// OTHERS //
import { createServerClient } from "@supabase/ssr";

// CONSTANTS //
import { AUTH_ROUTES, ROUTES } from "@/app/constants/routes";

/** Proxy function to handle authentication */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Get user claims
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Get pathname
  const pathname = request.nextUrl.pathname;

  // Check if user is authenticated
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // If user is not authenticated and is not on an auth route, redirect to login
  if (!user && !isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  // If user is authenticated and is on an auth route, redirect to home
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
