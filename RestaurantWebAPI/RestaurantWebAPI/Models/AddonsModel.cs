using System.ComponentModel.DataAnnotations;

namespace RestaurantWebAPI.Models
{
    public class AddonsModel
    {

        [Key]
        public int? ID { get; set; }
        public string? Name { get; set; }
        public float? Price { get; set; }
        public int DishItemId { get; set; }
    }
}
