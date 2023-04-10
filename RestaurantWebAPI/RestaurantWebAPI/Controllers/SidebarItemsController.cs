using Microsoft.AspNetCore.Mvc;
using RestaurantWebAPI.Models;
using System.Data;
using System.Data.SqlClient;

namespace  RestaurantWebAPI.Controllers
{

    [ApiController]
    public class SidebarItemsController : Controller
    {
        private readonly IConfiguration configuration;
        public SidebarItemsController(IConfiguration config)
        {
            configuration = config;
        }
        [HttpGet]
        [Route("GetAllSidebarItems")]
        public List<SidebarItemsModel> GetAllSidebarItems()
        {
            List<SidebarItemsModel> sidebarItemsList = new List<SidebarItemsModel>();

            SqlConnection connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            SqlCommand command = new SqlCommand("select * from Sidebar_Items_Table", connection);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            DataTable dt = new DataTable();
            adapter.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                SidebarItemsModel sidebarItemsModelobj = new SidebarItemsModel();
                sidebarItemsModelobj.sidebar_item_id = int.Parse(dt.Rows[i]["sidebar_item_id"].ToString());
                sidebarItemsModelobj.sidebar_item_name = dt.Rows[i]["sidebar_item_name"].ToString();
                sidebarItemsModelobj.sidebar_item_parent_id = int.Parse(dt.Rows[i]["sidebar_item_parent_id"].ToString());
                sidebarItemsModelobj.sidebar_item_destination = dt.Rows[i]["sidebar_item_destination"].ToString();
                sidebarItemsList.Add(sidebarItemsModelobj);
            }

            return sidebarItemsList;
        }
    }
}

