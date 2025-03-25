import Sidebar from "@/components/sidebar";
import { AuthContextProvider } from "../login/_utils/auth-context";

export default function Page() {
  return (
      <AuthContextProvider>
        <div className="flex">
          <Sidebar />
          <div className="lg:ml-64 p-10 transition-all duration-300">
            <h1 className="text-3xl font-semibold">Teams</h1>
            <p className="mt-4 text-lg">Create, delete, and organize teams within your league.</p>
          </div>
        </div>
      </AuthContextProvider>
  );
}
