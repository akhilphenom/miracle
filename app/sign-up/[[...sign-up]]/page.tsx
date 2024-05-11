import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <SignUp path="/sign-up" />;
    </div>
  )
}