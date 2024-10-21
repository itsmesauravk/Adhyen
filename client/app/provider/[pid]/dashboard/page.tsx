import NavbarProvider from "@/app/components/provider/Navbar"

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavbarProvider />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1>Dashboard content goes here.</h1>
      </main>
    </div>
  )
}

export default Dashboard
