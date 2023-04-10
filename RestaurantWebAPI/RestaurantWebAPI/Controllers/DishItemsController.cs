using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestaurantWebAPI.Models;
using System.Data.SqlClient;
using System.Data;
using System.Net.Sockets;
using System.Net;

namespace RestaurantWebAPI.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class DishItemsController : ControllerBase
    {
            private readonly IConfiguration _configuration;
            public DishItemsController(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            [HttpGet]
            [Route("GetAllDishItems")]
            public List<DishItemsModel> GetAllDishItems()
            {
                List<DishItemsModel> dishItemsList = new List<DishItemsModel>();
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new SqlCommand("SELECT * FROM Dish_Items_Table", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                for (int i = 0; i < dt.Rows.Count; i++)
                {


                    DishItemsModel dishItem = new DishItemsModel();
                    dishItem.ID = int.Parse(dt.Rows[i]["dish_item_id"].ToString());
                    dishItem.Name = dt.Rows[i]["dish_item_name"].ToString();
                    //dishItem.ParentMenuID = int.Parse(dt.Rows[i]["dish_item_parent_menu_id"].ToString());
                    // try parse parentMenuId
                    int dishItemParentMenuId;
                    int.TryParse(dt.Rows[i]["dish_item_parent_menu_id"].ToString(), out dishItemParentMenuId);
                    dishItem.ParentMenuID = dishItemParentMenuId;

                    // try parse float (as there is none floats /null value in input data)
                    float dishItemPrice;
                    float.TryParse(dt.Rows[i]["dish_item_price"].ToString(), out dishItemPrice);
                    dishItem.Price = dishItemPrice;
                    dishItem.Description = dt.Rows[i]["dish_item_description"].ToString();

                    dishItem.ImagePath = dt.Rows[i]["dish_item_image_path"].ToString();
                    dishItem.AddedBy = dt.Rows[i]["added_by"].ToString();
                    //try parse addded date
                    DateTime addedDate;
                    DateTime.TryParse(dt.Rows[i]["added_date"].ToString(), out addedDate);
                    dishItem.AddedDate = addedDate;
                    dishItem.AddedPC = dt.Rows[i]["added_pc"].ToString();
                    dishItem.UpdatedBy = dt.Rows[i]["updated_by"].ToString();
                    //try parse addded date
                    DateTime updatedDate;
                    DateTime.TryParse(dt.Rows[i]["updated_date"].ToString(), out updatedDate);
                    dishItem.UpdatedDate = updatedDate;
                    dishItem.UpdatedPC = dt.Rows[i]["updated_pc"].ToString();


                    dishItemsList.Add(dishItem);
                }
                return dishItemsList;
            }

            //GetAllDishItemsWithAddons
            [HttpGet]
            [Route("GetAllDishItemsWithAddons")]

            public List<DishItemsModel> GetAllDishItemsWithAddons()
            {
                List<DishItemsModel> dishItemsList = new List<DishItemsModel>();
                List<AddonsModel> addonsList = new List<AddonsModel>();
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new SqlCommand("SELECT Dish_Items_Table.*, Addons_Table.* FROM Dish_Items_Table LEFT JOIN Addons_Table ON Dish_Items_Table.dish_item_id = Addons_Table.dishItem_id", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                var groupedData = dt.AsEnumerable().GroupBy(r => r.Field<int>("dish_item_id"));
                foreach (var group in groupedData)
                {
                    // Map the columns from the result set to the properties of your model classes
                    DishItemsModel dishItem = new DishItemsModel();
                    dishItem.ID = group.Key;
                    dishItem.Name = group.First().Field<string>("dish_item_name");
                    int dishItemParentMenuId;
                    int.TryParse(group.First().Field<int>("dish_item_parent_menu_id").ToString(), out dishItemParentMenuId);
                    dishItem.ParentMenuID = dishItemParentMenuId;

                    // try parse float (as there is none floats /null value in  data)

                    float? dishItemPrice = null;
                    if (!string.IsNullOrEmpty(group.First().Field<object>("dish_item_price")?.ToString()))
                    {
                        float price;
                        if (float.TryParse(group.First().Field<object>("dish_item_price").ToString(), out price))
                        {
                            dishItemPrice = price;
                        }
                    }
                    dishItem.Price = dishItemPrice;
                    dishItem.Description = group.First().Field<string>("dish_item_description");

                    dishItem.ImagePath = group.First().Field<string>("dish_item_image_path");
                    dishItem.AddedBy = group.First().Field<string>("added_by");
                    //try parse addded date

                    DateTime? addedDate = null;
                    if (group.First()["added_date"] != DBNull.Value)
                    {
                        DateTime tempAddedDate;
                        if (DateTime.TryParse(group.First().Field<DateTime>("added_date").ToString(), out tempAddedDate))
                        {
                            addedDate = tempAddedDate;
                        }
                    }
                    dishItem.AddedDate = addedDate;
                    dishItem.AddedPC = group.First().Field<string>("added_pc");
                    dishItem.UpdatedBy = group.First().Field<string>("updated_by");
                    //try parse addded date


                    DateTime? updatedDate = null;
                    if (group.First()["updated_date"] != DBNull.Value)
                    {
                        DateTime tempUpdatedDate;
                        if (DateTime.TryParse(group.First().Field<DateTime>("updated_date").ToString(), out tempUpdatedDate))
                        {
                            updatedDate = tempUpdatedDate;
                        }
                    }
                    dishItem.UpdatedDate = addedDate;
                    dishItem.UpdatedPC = group.First().Field<string>("updated_pc");


                    foreach (var row in group)
                    {
                        AddonsModel addon = new AddonsModel();
                        addon.ID = row.Field<int?>("id");
                        addon.Name = row.Field<string>("name");

                        if (row["price"] != DBNull.Value)
                        {
                            double price = Convert.ToDouble(row["price"]);
                            addon.Price = Convert.ToSingle(price);
                        }
                        else
                        {
                            addon.Price = null;
                        }
                        if (row["dishItem_id"] != DBNull.Value)
                            addon.DishItemId = row.Field<int>("dishItem_id");

                        // Add the addon to the list of addons
                        addonsList.Add(addon);
                    }

                    // Add the dish item to the list
                    dishItemsList.Add(dishItem);
                }

                // Add the addons to the corresponding dish items
                foreach (var dishItem in dishItemsList)
                {
                    dishItem.addonListArray = addonsList.Where(a => a.DishItemId == dishItem.ID).ToList();
                }

                return dishItemsList;
            }

            [HttpPost]
            [Route("AddDishItems")]
            public string AddDishItems([FromForm] DishItemsModel dishItem, [FromForm] string? addons)

            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand cmd = new SqlCommand("INSERT INTO Dish_Items_Table " +
                                                 "OUTPUT INSERTED.dish_item_id " +
                                                 "VALUES (@dish_item_name, @dish_item_parent_menu_id, @dish_item_price, @dish_item_description, @dish_item_image_path, @added_by, @added_date, @added_pc, @updated_by, @updated_date, @updated_pc)", con);

                try
                {
                    string path = Path.Combine(@"D:\Restaurant\Restaurent Images\Uploads", dishItem.ImageName);
                    dishItem.ImagePath = path;

                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        dishItem.Image.CopyTo(stream);
                    }
                    string addedBy = Environment.UserName;
                    string addedPc = "";
                    //NetworkInterface[] interfaces = NetworkInterface.GetAllNetworkInterfaces();
                    //foreach (NetworkInterface ni in interfaces)
                    //{
                    //    if (ni.NetworkInterfaceType == NetworkInterfaceType.Ethernet || ni.NetworkInterfaceType == NetworkInterfaceType.Wireless80211)
                    //    {
                    //        addedPc = ni.GetPhysicalAddress().ToString();
                    //        break;
                    //    }
                    //}
                    string hostName = Dns.GetHostName();
                    IPAddress[] addresses = Dns.GetHostAddresses(hostName);
                    string ipAddress = null;

                    foreach (IPAddress addr in addresses)
                    {
                        if (addr.AddressFamily == AddressFamily.InterNetwork)
                        {
                            ipAddress = addr.ToString();
                            break;
                        }
                    }

                    if (ipAddress != null)
                    {
                        addedPc = ipAddress;
                        Console.WriteLine("IP Address: " + ipAddress);
                    }
                    else
                    {
                        addedPc = "No IP address found."
    ; Console.WriteLine("No IP address found.");
                    }
                    cmd.Parameters.AddWithValue("@dish_item_name", dishItem.Name);
                    cmd.Parameters.AddWithValue("@dish_item_parent_menu_id", dishItem.ParentMenuID);
                    cmd.Parameters.AddWithValue("@dish_item_price", dishItem.Price);
                    cmd.Parameters.AddWithValue("@dish_item_description", dishItem.Description);
                    cmd.Parameters.AddWithValue("@dish_item_image_path", dishItem.ImagePath);
                    cmd.Parameters.AddWithValue("@added_by", addedBy);
                    cmd.Parameters.AddWithValue("@added_date", DateTime.Now);
                    cmd.Parameters.AddWithValue("@added_pc", addedPc);
                    cmd.Parameters.AddWithValue("@updated_by", "User");
                    cmd.Parameters.AddWithValue("@updated_date", DateTime.Now);
                    cmd.Parameters.AddWithValue("@updated_pc", "0.0.0.0");

                    con.Open();
                    int dishItemId = (int)cmd.ExecuteScalar();
                    con.Close();

                    ////other way for this there should be no inseted.ID in the query
                    //con.Open();
                    //cmd.ExecuteNonQuery();
                    //// Get the ID of the newly inserted dish item
                    //cmd.CommandText = "SELECT @@IDENTITY";
                    //int dishItemId = Convert.ToInt32(cmd.ExecuteScalar());
                    //con.Close();

                    //using string interpolation
                    if (!string.IsNullOrEmpty(addons))
                    {
                        List<AddonsModel> addon = JsonConvert.DeserializeObject<List<AddonsModel>>(addons);

                        if (addon != null && addon.Count > 0)
                            if (addon != null && addon.Count > 0)
                            {
                                string addonsInsertSql = "INSERT INTO Addons_Table (name, price, dishItem_id) VALUES ";
                                for (int i = 0; i < addon.Count; i++)
                                {
                                    addonsInsertSql += $"('{addon[i].Name}', {addon[i].Price}," +
                                        $" {dishItemId})";
                                    if (i < addon.Count - 1)
                                    {
                                        addonsInsertSql += ",";
                                    }
                                }
                                SqlCommand detailsInsertCommand = new SqlCommand(addonsInsertSql, con);
                                con.Open();
                                detailsInsertCommand.ExecuteNonQuery();
                                con.Close();
                            }
                    }


                    return "Dish item added successfully";
                }
                catch (Exception ex)
                {
                    return "Error: " + ex.Message;
                }
            }

            //Delete dishItem
            [HttpDelete]
            [Route("{id:int}")]
            public string DeleteDishItem([FromRoute] int id)
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                SqlCommand delete_cmd = new SqlCommand("DELETE FROM Dish_Items_Table WHERE dish_item_id=@id", con);
                //delete_cmd.CommandType = CommandType.Text;
                delete_cmd.Parameters.AddWithValue("@id", id);
                con.Open();
                delete_cmd.ExecuteNonQuery();
                con.Close();
                return "Menu Deleted Successfully";
            }
            //update
            

    }
}
