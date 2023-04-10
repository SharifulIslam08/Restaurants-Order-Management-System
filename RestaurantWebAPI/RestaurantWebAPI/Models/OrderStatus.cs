namespace RestaurantWebAPI.Models
{
    public class OrderStatus
    {
        public int order_id { get; set; }
        public int table_number { get; set; }
        public string order_status { get; set; }
        public float order_total_cost { get; set; }
        public DateTime? order_datetime { get; set; }
    }
}
