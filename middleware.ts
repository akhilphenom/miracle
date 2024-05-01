import { withClerkMiddleware } from "@clerk/nextjs";

export default withClerkMiddleware();

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};