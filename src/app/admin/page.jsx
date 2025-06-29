import CardLectureDashboard from "../AdminComponents/CardLectureDashboard";
// import TopBarDashboard from "@/components/Simple/TopBarDashboard";

const Page = () => {
  return (
    <div className="p-4">
      {/* <TopBarDashboard /> */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <CardLectureDashboard />
      </div>
    </div>
  );
};

export default Page;