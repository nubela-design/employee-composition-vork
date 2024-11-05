import CompanyForm from "./components/CompanyForm";

export default function Home() {
  return (
    <div className="p-12 bg-gray-100">
      <main className="flex flex-col row-start-2 gap-8 items-center sm:items-start">
        <CompanyForm />
      </main>
    </div>
  );
}
