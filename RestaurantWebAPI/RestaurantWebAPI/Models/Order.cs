using System.ComponentModel.DataAnnotations;

namespace RestaurantWebAPI.Models
{
    public class Order
    {
        [Key]
        //[JsonIgnore]
        public int? order_id { get; set; }
        public int? user_id { get; set; }
        public DateTime? order_datetime { get; set; }
        public string? order_status { get; set; }
        public float? order_total_cost { get; set; }
        public int? table_number { get; set; }
        public string? customization_instructions { get; set; }
        //public TimeOnly? serving_time { get; set; } = new TimeOnly(12, 0, 0);
        public DateTime? orderStatus_updatedTime { get; set; }
        public string? payment_method { get; set; }
        public string? payment_status { get; set; }
        public string? payment_reference_number { get; set; }
        //public IEnumerable<object> details_table { get; internal set; }
        public int[]? item_id { get; set; }
        public int[]? quantity { get; set; }
        public string[]? customization { get; set; }
    }
}
