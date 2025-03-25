import Sidebar from "@/components/sidebar";

export default function Leagues() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-64 p-10 transition-all duration-300">
        <h1 className="text-3xl font-semibold">Leagues</h1>
        <p className="mt-4 text-lg">
          Welcome to the Leagues page! Manage your soccer leagues with ease.
        </p>
      </div>
    </div>
  );
}