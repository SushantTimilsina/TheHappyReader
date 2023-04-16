import React, { useMemo } from "react";
import DashboardLayout from "../../../Components/Layout/DashboardLayout/DashboardLayout";
import {
  MdHomeWork,
  MdOutlineEmojiPeople,
  MdOutlineWork,
} from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from "recharts";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface Report {
  total_client: number;
  total_books: number;
  total_orders: number;
}
/* ----------------------------- Interfaces Ends ---------------------------- */

/* -------------------------------------------------------------------------- */

const data = [
  {
    name: "Page A",
    amt: 2400,
  },
  {
    name: "Page B",

    amt: 2210,
  },
  {
    name: "Page C",

    amt: 2290,
  },
  {
    name: "Page D",

    amt: 2000,
  },
  {
    name: "Page E",

    amt: 2181,
  },
  {
    name: "Page F",

    amt: 2500,
  },
  {
    name: "Page G",

    amt: 2100,
  },
];

const AdminDashboard = () => {
  const reportData: Report = useMemo(() => {
    return {
      total_client: 100,
      total_books: 11,
      total_orders: 5,
    };
  }, []);

  return (
    <DashboardLayout>
      <h1 className="pt-10 px-4 text-2xl lg:px-28 font-bold">
        Admin Dashboard
      </h1>
      {/* cards container starts */}
      <div className=" pt-10 px-4 gap-4 sm:flex flex-wrap lg:px-28">
        {/* card starts */}
        <div className="bg-white w-11/12 h-[12vh] px-2 py-4 my-4 flex gap-2 sm:w-2/5 md:w-1/4 md:min-w-[300px] md:max-w-[360px] shadow-md rounded-sm">
          {/* icon container starts  */}
          <div className="h-16 w-16 bg-[#fd8a1433] rounded-full flex  justify-center items-center">
            <span className="text-[#fd8a14] text-4xl">
              <MdOutlineEmojiPeople />
            </span>
          </div>
          {/* icon container ends */}
          <div>
            <h2 className=" mb-1 text-xl font-bold">Clients</h2>
            <p>{reportData.total_client}</p>
          </div>
        </div>
        {/* card ends */}

        {/* card starts */}
        <div className="bg-white w-11/12 h-[12vh] px-2 py-4 my-4 flex gap-2 sm:w-2/5 md:w-1/4 md:min-w-[300px] md:max-w-[360px] shadow-md rounded-sm">
          {/* icon container starts  */}
          <div className="h-16 w-16 bg-[#00b51733] rounded-full flex  justify-center items-center">
            <span className="text-[#00b517] text-4xl">
              <MdOutlineWork />
            </span>
          </div>
          {/* icon container ends */}
          <div>
            <h2 className=" mb-1 text-xl font-bold">Total Books</h2>
            <p className="mb-2">{reportData.total_books}</p>
          </div>
        </div>

        {/* card ends */}

        {/* card starts */}

        <div className="bg-white w-11/12 h-[12vh] px-2 py-4 my-4 flex gap-2 sm:w-2/5 md:w-1/4 md:min-w-[300px] md:max-w-[360px] shadow-md rounded-sm">
          {/* icon container starts  */}
          <div className="h-16 w-16 bg-[#3367eb33] rounded-full flex  justify-center items-center">
            <span className="text-[#3167eb] text-4xl">
              <MdHomeWork />
            </span>
          </div>
          {/* icon container ends */}
          <div>
            <h2 className=" mb-1 text-xl font-bold">Total Order</h2>
            <p>{reportData.total_orders}</p>
          </div>
        </div>
        {/* card ends */}
      </div>
      {/* cards container ends */}

      {/* chart container starts */}
      <div className="bg-white">
        {/* <BarChart
          width={1000}
          height={400}
          data={data}
          margin={{ top: 5, right: 0, left: 100, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="amt" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
          <Bar
            dataKey="amt"
            barSize={30}
            fill="#8884d8"
            // label={renderCustomBarLabel}
          />
        </BarChart> */}
      </div>
    </DashboardLayout>
  );
};

export default React.memo(AdminDashboard);
