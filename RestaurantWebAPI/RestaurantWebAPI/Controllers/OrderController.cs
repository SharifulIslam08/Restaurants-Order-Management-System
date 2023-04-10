using Microsoft.AspNetCore.Mvc;
using RestaurantWebAPI.Models;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace testorder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class orderController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public orderController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // GET: api/<orderController>
        [HttpGet]
        [Route("getallorderlist")]
        public List<Order> getallorderlist()
        {
            List<Order> list = new List<Order>();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT * FROM order_master_table OT JOIN order_details_table OD ON OT.order_id = OD.order_id;", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);

            // Group the rows by order ID
            var groupedData = dataTable.AsEnumerable().GroupBy(row => row.Field<int>("order_id"));

            foreach (var group in groupedData)
            {
                // Create a new order object for each group
                Order obj = new Order();
                obj.order_id = group.Key; // Set the order ID

                // Set the remaining order properties from the first row of the group
                obj.user_id = int.Parse(group.First()["user_id"].ToString());
                obj.order_datetime = DateTime.Parse(group.First()["order_datetime"].ToString());
                obj.order_status = group.First()["order_status"].ToString();
                obj.order_total_cost = float.Parse(group.First()["order_total_cost"].ToString());
                obj.table_number = int.Parse(group.First()["table_number"].ToString());
                obj.customization_instructions = group.First()["customization_instructions"].ToString();
                obj.orderStatus_updatedTime = DateTime.Parse(group.First()["orderStatus_updatedTime"].ToString());
                obj.payment_method = group.First()["payment_method"].ToString();
                obj.payment_status = group.First()["payment_status"].ToString();
                obj.payment_reference_number = group.First()["payment_reference_number"].ToString();

                // Get the list of item IDs and quantities for the current group
                List<int> itemIds = new List<int>();
                List<int> quantities = new List<int>();
                List<string> customizations = new List<string>();
                foreach (var row in group)
                {
                    itemIds.Add(int.Parse(row["item_id"].ToString()));
                    quantities.Add(int.Parse(row["quantity"].ToString()));
                    customizations.Add(row["customization"].ToString());
                }

                obj.item_id = itemIds.ToArray();
                obj.quantity = quantities.ToArray();
                obj.customization = customizations.ToArray();

                list.Add(obj);
            }
            return list;
        }

        [HttpGet]
        [Route("getorderstatus")]
        public List<OrderStatus> getorderstatus()
        {
            List<OrderStatus> list = new List<OrderStatus>();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("SELECT order_id, order_datetime, table_number, order_total_cost, order_status FROM order_master_table WHERE order_status != 'delivered'", con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                OrderStatus obj = new OrderStatus();
                obj.order_id = int.Parse(dataTable.Rows[i]["order_id"].ToString());
                obj.order_status = dataTable.Rows[i]["order_status"].ToString();
                obj.table_number = int.Parse(dataTable.Rows[i]["table_number"].ToString());
                obj.order_datetime = DateTime.Parse(dataTable.Rows[i]["order_datetime"].ToString());
                obj.order_total_cost = float.Parse(dataTable.Rows[i]["order_total_cost"].ToString());
                list.Add(obj);
            }
            return list;
        }

        //// GET api/<orderController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpPost]
        [Route("addorder")]
        public string addorder([FromForm] Order orders)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("INSERT INTO order_master_table VALUES (" +
                "@user_id,@order_datetime,@order_status," +
                "@order_total_cost,@table_number,@customization_instructions," +
                "@payment_method,@payment_status,@payment_reference_number,@orderStatus_updatedTime); " +
                "SELECT SCOPE_IDENTITY();", con); // add SELECT SCOPE_IDENTITY() to retrieve the primary key value
            try
            {
                cmd.Parameters.AddWithValue("@user_id", 0);
                cmd.Parameters.AddWithValue("@order_datetime", DateTime.Now);
                cmd.Parameters.AddWithValue("@order_status", "true");
                cmd.Parameters.AddWithValue("@order_total_cost", orders.order_total_cost);
                cmd.Parameters.AddWithValue("@table_number", orders.table_number);
                cmd.Parameters.AddWithValue("@customization_instructions", orders.customization_instructions);
                cmd.Parameters.AddWithValue("@payment_method", "cash");
                cmd.Parameters.AddWithValue("@payment_status", "paid");
                cmd.Parameters.AddWithValue("@payment_reference_number", "abc123");
                cmd.Parameters.AddWithValue("@orderStatus_updatedTime", DateTime.Now);

                con.Open();
                int orderId = Convert.ToInt32(cmd.ExecuteScalar()); // retrieve the primary key value
                con.Close();
                // insert order details using the retrieved primary key value
                StringBuilder sb = new StringBuilder();
                sb.Append("INSERT INTO order_details_table (order_id, item_id, quantity, customization) VALUES ");
                for (int i = 0; i < orders.item_id.Length; i++)
                {
                    sb.Append("(");
                    sb.Append(orderId).Append(",");
                    sb.Append(orders.item_id[i]).Append(",");
                    sb.Append(orders.quantity[i]).Append(",");
                    sb.Append("'").Append(orders.customization[i]).Append("'");
                    sb.Append("),");
                }
                sb.Length--; // remove the last comma
                SqlCommand detailsInsertCommand = new SqlCommand(sb.ToString(), con);
                con.Open();
                detailsInsertCommand.ExecuteNonQuery();

                con.Close();

                return ("Successfully Ordered");
                // insert order details using the retrieved primary key value
                //foreach (var orderDetails in orders.details_table)
                //{
                //for (int i = 0; i < orders.item_id.Length; i++)
                //{
                //    SqlCommand detailsInsertCommand = new SqlCommand("INSERT INTO order_details_table VALUES (" +
                //        "@order_id,@item_id,@quantity," +
                //        "@customization)", con);
                //    detailsInsertCommand.Parameters.AddWithValue("@order_id", orderId);
                //    detailsInsertCommand.Parameters.AddWithValue("@item_id", orders.item_id[i]);
                //    detailsInsertCommand.Parameters.AddWithValue("@quantity", orders.quantity[i]);
                //    detailsInsertCommand.Parameters.AddWithValue("@customization", orders.customization);
                //    con.Open();
                //    detailsInsertCommand.ExecuteNonQuery();
                //    con.Close();

                //}

                ////}

                //return ("Seccessfully Ordered");
            }
            catch (Exception ex)
            {
                return ("Error" + ex);
            }
        }


        // PUT api/<orderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Order value)
        {
            using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                SqlCommand cmd = new SqlCommand("UPDATE order_master_table SET order_status = @value, orderStatus_updatedTime= @orderStatus_updatedTime WHERE order_id = @id", con);
                cmd.Parameters.AddWithValue("@value", value.order_status);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@orderStatus_updatedTime", DateTime.Now);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }



        //// DELETE api/<orderController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}