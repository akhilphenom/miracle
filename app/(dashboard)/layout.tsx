import BoardsProvider from "@/providers/boards-provider"
import { Navbar } from "./_components/navbar"
import { OrganizationSidebar } from "./_components/organization-sidebar"
import { Sidebar } from "./_components/sidebar"
import { RedirectToSignIn, SignedIn, SignedOut, UserButton, auth } from '@clerk/nextjs'

interface DashboardLayoutProps {
    children: React.ReactNode
}

interface AuthStateProps {
    children: React.ReactNode
}

function AuthState({children}: AuthStateProps) {
    return (
      <div>
          <SignedIn>
              {children}
          </SignedIn>
          <SignedOut>
              <RedirectToSignIn/>
          </SignedOut>
      </div>
    );
  }

export default function ({children}: DashboardLayoutProps) {
    return (
        <AuthState>
            <main className="h-dvh w-dvw">
                <Sidebar/>
                <div className="pl-[60px] h-full">
                    <div className="flex h-full gap-x-3">
                        <BoardsProvider>
                            <OrganizationSidebar/>
                            <div className="h-full flex-1 flex flex-col">
                                <Navbar/>
                                {children}
                            </div>
                        </BoardsProvider>
                    </div>
                </div>
            </main>
        </AuthState>
    )
}