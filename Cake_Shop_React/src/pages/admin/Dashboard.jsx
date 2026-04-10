import React from "react";
import { fetchDashboardStats } from "../../api/commonAPIs";
import "./Dashboard.scss";

const Dashboard = () => {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      const statsResObj = await fetchDashboardStats();
      if (statsResObj.error) {
        console.error("Error fetching dashboard stats:", statsResObj.error);
      } else {
        const { totalOrders, totalUsers, totalProducts, totalRevenue } =
          statsResObj.data;
        const formattedStats = [
          {
            title: "Total Orders",
            value: totalOrders.toLocaleString(),
            color: "#ec4899",
          },
          {
            title: "Total Users",
            value: totalUsers.toLocaleString(),
            color: "#3b82f6",
          },
          {
            title: "Total Products",
            value: totalProducts.toLocaleString(),
            color: "#10b981",
          },
          {
            title: "Total Revenue",
            value: totalRevenue.toLocaleString(),
            color: "#f59e0b",
          },
        ];
        setStats(formattedStats);
      }
    };
    fetchStats();
  }, []);

  // const stats = [
  //   { title: "Total Orders", value: "1,234", color: "#ec4899" },
  //   { title: "Total Users", value: "567", color: "#3b82f6" },
  //   { title: "Total Products", value: "89", color: "#10b981" },
  //   { title: "Total Revenue", value: "₹45,678", color: "#f59e0b" },
  // ];

  return (
    <div className="admin-dashboard">
      <div className="stats-container">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ borderLeftColor: stat.color }}
          >
            <h3>{stat.title}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <p>Dashboard content coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;
